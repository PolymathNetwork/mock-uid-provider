import { useState, useEffect } from 'react';
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from '@polkadot/extension-inject/types';
import { connectPolymeshWallet, createApi, getSelectedAccount } from './api';
import { NetworkMeta } from './types';
import { web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { ApiPromise } from '@polkadot/api';
import { Codec } from '@polkadot/types/types';
import { hexToU8a } from '@polkadot/util';
import { stringify as uuidStringify } from 'uuid';

export function App() {
  const [wallet, setWallet] = useState<InjectedExtension>();
  const [network, setNetwork] = useState<NetworkMeta>();
  const [account, setAccount] = useState<InjectedAccountWithMeta>();
  const [api, setApi] = useState<ApiPromise>();
  const [did, setDid] = useState<string>();

  const provideUidFromDid = async () => {
    if (!wallet || !did) return;

    console.log('Generating uID...');

    const crypto = await import('@polymathnetwork/confidential-identity');
    const mockUIdHex = `0x${crypto.process_create_mocked_investor_uid(did)}`;
    const uid = uuidStringify(hexToU8a(mockUIdHex));

    console.log('>>> uid', uid);

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
    const uid = await wallet.uid.read();

    console.log({ uid });
  };

  // Connect polymesh wallet on mount
  useEffect(() => {
    connectPolymeshWallet()
      .then((polyWallet) => setWallet(polyWallet))
      .catch((error) => console.error(error));
  }, []);

  // Set selected account and subscribe to account changes
  useEffect(() => {
    if (!wallet) return;

    // @ts-ignore
    wallet.network.get().then((network) => setNetwork(network));
    // @ts-ignore
    wallet.network.subscribe((network) => setNetwork(network));

    getSelectedAccount()
      .then((account) => setAccount(account))
      .catch((error) => console.error(error));

    web3AccountsSubscribe((accounts) => {
      if (accounts.length) setAccount(accounts[0]);
    });
  }, [wallet]);

  // Initialize Polkadot API on network changes
  useEffect(() => {
    if (!network) return;

    setApi(undefined);
    setDid(undefined);

    createApi(network.name).then((api) => {
      setApi(api);
      setNetwork(network);
    });
  }, [network]);

  // Set DID
  useEffect(() => {
    if (!api || !account) return;

    api.query.identity
      .keyToIdentityIds(account.address)
      .then((value: unknown) => {
        const codec = value as Codec;

        setDid(codec.isEmpty ? undefined : codec.toString());
      });
  }, [api, account]);

  return api && network && account ? (
    <>
      <h2>Network: {network.name}</h2>
      <h2>Account: {account.address}</h2>
      <h2>DID: {did}</h2>

      {network.name !== 'itn' && (
        <button onClick={provideUidFromDid}>
          Generate a dummy uID and import it to Polymesh wallet
        </button>
      )}

      <button onClick={readUid}>Read uID</button>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
