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

  const onNetworkChange = async (network: NetworkMeta) => {
    setApi(undefined);
    setDid(undefined);

    const api = await createApi(network.name);

    setApi(api);
    setNetwork(network);
  };

  const onAccountChange = (account: InjectedAccountWithMeta) => {
    setAccount(account);
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
    wallet.network.get().then(onNetworkChange);

    // @ts-ignore
    wallet.network.subscribe(onNetworkChange);

    getSelectedAccount()
      .then(onAccountChange)
      .catch((error) => console.error(error));

    web3AccountsSubscribe((accounts) => {
      if (accounts.length) onAccountChange(accounts[0]);
    });
  }, [wallet]);

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
