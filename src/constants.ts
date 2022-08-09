import { NetworkName } from './types';

export const networkURLs: Record<string, string> = {
  mainnet: 'wss://mainnet-rpc.polymesh.network',
  testnet: 'wss://testnet-rpc.polymesh.live',
  staging: 'wss://staging-rpc.polymesh.live',
  local: 'ws://localhost:9944',
};

export const polySchemaUrls: Record<NetworkName, string> = {
  mainnet: '',
  testnet: '',
  staging:
    'https://raw.githubusercontent.com/PolymathNetwork/Polymesh/staging/polymesh_schema.json',
  local: '',
};
