export enum NetworkName {
  mainnet = 'mainnet',
  testnet = 'testnet',
  staging = 'staging',
  local = 'local',
}

export type NetworkMeta = {
  name: NetworkName;
  label?: string;
  wssUrl: string;
};
