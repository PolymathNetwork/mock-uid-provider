import { useState, useEffect, ChangeEvent } from 'react';
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from '@polkadot/extension-inject/types';
import { NetworkMeta } from './types';
import {
  web3Accounts,
  web3AccountsSubscribe,
  web3Enable,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Codec } from '@polkadot/types/types';
import { hexToU8a } from '@polkadot/util';
import { stringify as uuidStringify } from 'uuid';
import { polymesh_schema } from './schema';
import { networkURLs } from './constants';
import {
  polyTheme,
  Text,
  Heading,
  Button,
  Box,
  Input,
  PolyThemeProvider,
  Grid,
  Flex,
  styled,
} from '@polymathnetwork/ui-blocks';

const CodeText = styled(Text)`
  font-size: 16px;
`;

type Message = {
  isError?: boolean;
  text: string;
};

export function App() {
  const [wallet, setWallet] = useState<InjectedExtension>();
  const [network, setNetwork] = useState<NetworkMeta>();
  const [account, setAccount] = useState<InjectedAccountWithMeta>();
  const [api, setApi] = useState<ApiPromise>();
  const [did, setDid] = useState<string>();
  const [hasUid, setHasUid] = useState(false);
  const [inputUid, setInputUid] = useState('');
  const [ticker, setTicker] = useState('');
  const [message, setMessage] = useState<Message>();

  const provideUidFromDid = async () => {
    if (!wallet || !did) return;

    const crypto = await import('@polymathnetwork/confidential-identity');
    const mockUIdHex = `0x${crypto.process_create_mocked_investor_uid(did)}`;
    const uid = uuidStringify(hexToU8a(mockUIdHex));

    // @ts-ignore
    wallet.uid
      .provide({
        uid,
        did,
        network: network?.name,
      })
      .then(() =>
        setMessage({ text: 'uID successfully imported to Polymesh wallet' })
      )
      .catch((error: any) => {
        setMessage({
          isError: true,
          text: error.message,
        });
      });
  };

  const readUid = () => {
    // @ts-ignore
    wallet.uid
      .read()
      .then((uid: any) => setMessage({ text: `uID: ${uid.uid}` }))
      .catch((error: any) => {
        setMessage({
          isError: true,
          text: error.message,
        });
      });
  };

  const provideInputUid = async () => {
    // @ts-ignore
    wallet.uid
      .provide({
        uid: inputUid,
        did,
        network: network?.name,
      })
      .then(() =>
        setMessage({ text: 'uID successfully imported to Polymesh wallet' })
      )
      .catch((error: any) =>
        setMessage({
          isError: true,
          text: error.message,
        })
      );
  };

  const generateProof = async () => {
    // @ts-ignore
    wallet.uid
      .requestProof({ ticker })
      .then((proof: Object) => {
        setMessage({ text: JSON.stringify(proof, null, 2) });
      })
      .catch((error: any) =>
        setMessage({
          isError: true,
          text: error.message,
        })
      );
  };

  const updateInputUid = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUid(event.target.value);
  };

  const updateTicker = (event: ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  // Connect Polymesh wallet and set account on mount
  useEffect(() => {
    const connectPolymeshWallet = async () => {
      const extensions = await web3Enable('Mock uID Provider');
      const polyWallet = extensions.find(
        (extension) => extension.name === 'polywallet'
      );

      if (!polyWallet) throw new Error('Polymesh wallet not found');

      setWallet(polyWallet);

      // @ts-ignore
      polyWallet.network.get().then((network) => setNetwork(network));
      // @ts-ignore
      polyWallet.network.subscribe((network) => setNetwork(network));
    };

    const getSelectedAccount = async () => {
      const accounts = await web3Accounts();

      if (accounts.length === 0)
        throw new Error('No accounts found in Polymesh wallet');

      setAccount(accounts[0]);

      web3AccountsSubscribe((accounts) => {
        if (accounts.length) setAccount(accounts[0]);
      });
    };

    connectPolymeshWallet().then(getSelectedAccount);
  }, []);

  // Initialize/re-initialize Polkadot API on network changes
  useEffect(() => {
    if (!network) return;

    setApi(undefined);
    setDid(undefined);

    const apiPromise = new ApiPromise({
      provider: new WsProvider(networkURLs[network.name]),
      types: polymesh_schema.types,
      rpc: polymesh_schema.rpc,
    });

    apiPromise.isReady.then((api) => setApi(api));
  }, [network]);

  // Set DID and check if uID is set on account changes
  useEffect(() => {
    if (!api || !account || !wallet) return;

    api.query.identity
      .keyToIdentityIds(account.address)
      .then((value: unknown) => {
        const codec = value as Codec;

        setDid(codec.isEmpty ? undefined : codec.toString());
      });

    // @ts-ignore
    wallet.uid.isSet().then((hasUid: boolean) => {
      setHasUid(hasUid);
    });
  }, [api, account, wallet]);

  // Clear messages, errors, and inputs on certain state changes
  useEffect(() => {
    setMessage(undefined);
    setInputUid('');
    setTicker('');
  }, [api, account, wallet, network]);

  return (
    <PolyThemeProvider theme={polyTheme}>
      <Box variant="basic">
        {api && network && account ? (
          <>
            <Grid
              variant="basic"
              margin="0 0 l"
              padding="0"
              cols="min-content auto"
            >
              <Box variant="basic" padding="0 s 0 0">
                <Text variant="p">network:</Text>
                <Text variant="p">address:</Text>
                <Text variant="p">DID:</Text>
                <Text variant="p">uID:</Text>
              </Box>
              <div>
                <Text variant="p" format="b1m">
                  {network.name.toUpperCase()}
                </Text>
                <Text variant="p" format="b1m">
                  {account.address}
                </Text>
                <Text variant="p" format="b1m">
                  {did}
                </Text>
                <Text variant="p" format="b1m">
                  {hasUid ? 'Has uID' : 'Does not have uID'}
                </Text>
              </div>
            </Grid>

            {did && network.name !== 'itn' && (
              <Button
                variant="primary"
                onClick={provideUidFromDid}
                margin="0 s 0 0"
              >
                Generate a dummy uID and import it to Polymesh wallet
              </Button>
            )}

            {hasUid && (
              <Button variant="secondary" onClick={readUid}>
                Read uID from Polymesh wallet
              </Button>
            )}

            <Box variant="basic" margin="l 0 0 0" padding="0">
              <Flex variant="basic" padding="0" margin="0 0 m">
                <Input
                  variant="basic"
                  placeholder="uID"
                  value={inputUid}
                  onChange={updateInputUid}
                  margin="0 s 0 0"
                />
                <Button variant="special" onClick={provideInputUid}>
                  Enter uID and import it to Polymesh wallet
                </Button>
              </Flex>

              {hasUid && (
                <Flex variant="basic" padding="0">
                  <Input
                    variant="basic"
                    placeholder="Ticker"
                    value={ticker}
                    onChange={updateTicker}
                    margin="0 s 0 0"
                  />
                  <Button variant="special" onClick={generateProof}>
                    Use stored uID to generate proof
                  </Button>
                </Flex>
              )}
            </Box>

            {message?.text &&
              (message.isError ? (
                <Text variant="p" color="danger" margin="l 0 0">
                  {message.text}
                </Text>
              ) : (
                <CodeText
                  variant="p"
                  format="code"
                  margin="l 0 0"
                  color="success"
                >
                  <pre>{message.text}</pre>
                </CodeText>
              ))}
          </>
        ) : (
          <Heading variant="h1">Loading...</Heading>
        )}
      </Box>
    </PolyThemeProvider>
  );
}
