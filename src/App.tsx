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

export function App() {
  const [wallet, setWallet] = useState<InjectedExtension>();
  const [network, setNetwork] = useState<NetworkMeta>();
  const [account, setAccount] = useState<InjectedAccountWithMeta>();
  const [api, setApi] = useState<ApiPromise>();
  const [did, setDid] = useState<string>();

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

  return api ? (
    <>
      <h2>Network: {network?.name}</h2>
      <h2>Account: {account?.address}</h2>
      <h2>DID: {did}</h2>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
