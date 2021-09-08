import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

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
