import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { Codec } from '@polkadot/types/types';
import { networkURLs } from './constants';
import { polymesh_schema } from './schema';
import { NetworkName } from './types';

export async function connectPolymeshWallet() {
  const extensions = await web3Enable('Mock uID Provider');
  const polyWallet = extensions.find(
    (extension) => extension.name === 'polywallet'
  );

  if (polyWallet) return polyWallet;

  throw new Error('Polymesh wallet not found');
}

export async function getSelectedAccount() {
  const accounts = await web3Accounts();

  if (accounts.length === 0)
    throw new Error('No accounts found in Polymesh wallet');

  return accounts[0];
}

export async function createApi(network: NetworkName) {
  const apiPromise = new ApiPromise({
    provider: new WsProvider(networkURLs[network]),
    types: polymesh_schema.types,
    rpc: polymesh_schema.rpc,
  });

  const api = await apiPromise.isReady;

  return api;
}

export async function getDid(api: ApiPromise, address: string) {
  const didCodec = await api.query.identity.keyToIdentityIds(address);

  return (didCodec as Codec).toString();
}
