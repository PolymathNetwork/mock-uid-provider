import React, { useEffect, useState } from 'react';
import './App.css';
import { web3Enable, web3Accounts, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import schema from './polymesh_schema.json';
import { hexToU8a } from '@polkadot/util';
import { stringify as uuidStringify } from 'uuid';
import { networkURLs } from './constants';

function App() {
  const [polyWallet, setPolyWallet] = useState<any>(null);
  const [proof, setProof] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [api, setApi] = useState<ApiPromise | undefined>();
  const [did, setDid] = useState<string | undefined>();
  const [network, setNetwork] = useState<string | undefined>();
  const [error, setInternalError] = useState<Error | undefined>();
  const [ticker, setTicker] = useState<string>('')

  const setError = (error: Error, disappear: boolean = false) => {
    setInternalError(error);
    disappear && setTimeout(() => setInternalError(undefined), 3000);
  }

  const setDisappearingError = (error: Error) => setError(error, true);

  const reset = () => {
    setDid(undefined);
    setProof('');
    setInternalError(undefined);
    setTicker('');
  }

  useEffect(() => {
    if (!polyWallet) {
      (new Promise((resolve) => {
        setTimeout(() => resolve(null), 750)
       })).then(() => {
          web3Enable('Mock uID Provider').then((exts) => {
            const wallet = exts.filter(ext => ext.name === 'polywallet')[0]
            if (!wallet) {
              setError(new Error(`Please install Polymesh wallet extension from Chrome store`));
              return;
            }

            setPolyWallet(wallet);

            // @ts-ignore
            wallet.network.subscribe((network) => {
              setNetwork(network.name);
            });

            // @ts-ignore
            wallet.network.get().then(network => setNetwork(network.name));

            web3AccountsSubscribe((accounts) => {
              setAddress(accounts[0].address)
            });

            web3Accounts().then((accounts) => {
              if (!accounts.length) {
                setError(new Error('No accounts found in wallet extension'));
                return;
              }

              setAddress(accounts[0].address);
            })
          })
       });
    }
  }, [ polyWallet ]);

  useEffect(() => {
    if (network) {
      reset();

      const url = networkURLs[network];
      if (!url) {
        setError(new Error(`Unknown network: ${network}`));
      }

      const apiPromise = new ApiPromise({
        provider: new WsProvider(url),
        types: schema.types,
        rpc: schema.rpc
      });

      apiPromise.isReady.then((api) => {
        setApi(api);
      });
    }
  }, [ network ])

  useEffect(() => {
    if (api && address) {
      reset();

      api.query.identity.keyToIdentityIds(address).then((linkedKeyInfo) => {
        if (!linkedKeyInfo.isEmpty) {
          setDid(linkedKeyInfo.toString());
        }
      })
    }
    
  }, [ api, address ])

  const generateProof = (polyWallet: any) => {
    if (!ticker.length) {
      setError(new Error('"Ticker" is required'), true);
      return;
    }
    polyWallet.uid.requestProof({ticker })
      .then((data: any) => {
        console.log('Data', data);
        setProof(data.proof);
      }, setDisappearingError)
      .catch(setDisappearingError);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTicker(event.target.value);
  }

  const provideUid = async (polyWallet: any, address: string, did: string) => {
    console.log('Generating uID...');
    const crypto = await import('pkg')
    const mockUIdHex = `0x${crypto.process_create_mocked_investor_uid(did)}`;
    const uid = uuidStringify(hexToU8a(mockUIdHex));

    console.log('>>> uid', uid);

    polyWallet.uid.provide({
      uid,
      did,
      network
    }).then(console.log, setDisappearingError).catch(setDisappearingError);
  }

  const Body = () => {
    if (polyWallet && api) {
      return (
        <>
          <p>
            Network: {network || 'unknown'}
          </p>
          <p>
            User address: {address || 'unknown'}
          </p>
          <p>
            DID: {did || 'none'}
          </p>
          { did && 
          <>
            <button  onClick={() => provideUid(polyWallet, address, did)}>
            Generate a dummy uID and import it to Polymesh wallet
            </button> 
            <p>
              <input name='ticker' value={ticker} type='text' onChange={handleChange} />
              <button onClick={() => generateProof(polyWallet)}>Use stored uID to generate proof</button>
            </p>
          </>
          } <br />
          { proof && <span>Proof: {JSON.stringify(proof, null, 3)} </span> }
          { error && <span>{error.message}</span>}
        </>
      )
    }
    else if (error) {
      return <span>{error.message}</span>
    }
    return <div>Initalizing API instance ...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Body />
      </header>
    </div> 
  );
  
}

export default App;
