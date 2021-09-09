import { useState, useEffect } from 'react';
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

export function App() {
  const [wallet, setWallet] = useState<InjectedExtension>();
  const [network, setNetwork] = useState<NetworkMeta>();
  const [account, setAccount] = useState<InjectedAccountWithMeta>();
  const [api, setApi] = useState<ApiPromise>();
  const [did, setDid] = useState<string>();
  const [hasUid, setHasUid] = useState(false);

  const provideUidFromDid = async () => {
    if (!wallet || !did) return;

    // console.log('Generating uID...');

    const crypto = await import('@polymathnetwork/confidential-identity');
    const mockUIdHex = `0x${crypto.process_create_mocked_investor_uid(did)}`;
    const uid = uuidStringify(hexToU8a(mockUIdHex));

    // console.log('>>> uid', uid);

    // @ts-ignore
    wallet.uid
      .provide({
        uid,
        did,
        network,
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const readUid = async () => {
    // @ts-ignore
    const { uid } = await wallet.uid.read().catch((error) => {
      console.error(error);
    });

    alert(uid ? uid : 'uID not found');
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

  // Set DID and check if uID is set
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

  return api && network && account ? (
    <>
      <div>network: {network.name}</div>
      <div>address: {account.address}</div>
      <div>DID: {did}</div>
      <div>uID: {hasUid ? 'Has uID' : 'Does not have uID'}</div>

      {network.name !== 'itn' && (
        <div>
          <button onClick={provideUidFromDid}>
            Generate a dummy uID and import it to Polymesh wallet
          </button>
        </div>
      )}

      {hasUid && (
        <div>
          <button onClick={readUid}>Read uID from Polymesh wallet</button>
        </div>
      )}
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
