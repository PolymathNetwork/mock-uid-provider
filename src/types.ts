export enum NetworkName {
  pmf = 'pmf',
  alcyone = 'alcyone',
  pme = 'pme',
  local = 'local',
  itn = 'itn',
}

export type NetworkMeta = {
  name: NetworkName;
  label?: string;
  wssUrl: string;
};
