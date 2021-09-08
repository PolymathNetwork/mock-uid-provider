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

    const api = await createApi(network.name);

    setApi(api);
    setNetwork(network);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const polyWallet = await connectPolymeshWallet();

        // @ts-ignore
        const network = await polyWallet.network.get();

        const account = await getSelectedAccount();
        const api = await createApi(network.name);
        const didCodec = await api.query.identity.keyToIdentityIds(
          account.address
        );

        // @ts-ignore
        polyWallet.network.subscribe(onNetworkChange);

        web3AccountsSubscribe((accounts) => {
          if (accounts.length) setAccount(accounts[0]);
        });

        setWallet(polyWallet);
        setNetwork(network);
        setAccount(account);
        setApi(api);
        setDid((didCodec as Codec).toString());
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, []);

  // useEffect(() => {
  //   if (!api || !account) return;

  //   api.query.identity
  //     .keyToIdentityIds(account.address)
  //     .then((value: unknown) => {
  //       console.log({ did: (value as Codec).toString() });
  //     });
  // }, [api, account]);

  return api ? (
    <>
      <h2>network: {network?.name}</h2>
      <h2>address: {account?.address}</h2>
      <h2>did: {did}</h2>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
