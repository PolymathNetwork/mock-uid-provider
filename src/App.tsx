import React, { useEffect, useState } from 'react';
import './App.css';
import { web3Accounts, web3AccountsSubscribe, web3Enable } from '@polkadot/extension-dapp';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import schema from './polymesh_schema.json';
import { hexToU8a } from '@polkadot/util';
import { stringify as uuidStringify } from 'uuid';
import { networkURLs } from './constants';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

function App() {
  const [polyWallet, setPolyWallet] = useState<any>(null);
  const [proof, setProof] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [api, setApi] = useState<ApiPromise | undefined>();
  const [did, setDid] = useState<string | undefined>();
  const [uidSet, setUidSet] = useState<boolean | undefined>(undefined);
  const [network, setNetwork] = useState<string | undefined>();
  const [error, setInternalError] = useState<Error | undefined>();
  const [ticker, setTicker] = useState<string>('');
  const [uid, setUid] = useState<string>('');
  const [importedUid, setImportedUid] = useState<string>('');
  

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
    setUid('');
    setUidSet(undefined);
  }


  useEffect(() => {
    const _accounts = (accounts: InjectedAccountWithMeta[]) => {
      // @TODO Fractal
      // Filter accounts based on their source.
      accounts = accounts.filter(account => account.meta.source === 'polywallet');
      if (accounts && accounts.length) {
        console.log('__accounts', accounts);
        // @TODO Fractal
        // Recode address with ITN prefix (or Alcyone's, according to selected network).
        const address = encodeAddress(decodeAddress(accounts[0].address), 12);
        setAddress(address);
      }
      else {
        setError(new Error('No accounts found in wallet extension'));
        return;
      }
    }

    
    if (!polyWallet) {
      (new Promise((resolve) => {
        // @TODO Fractal
        // There's a chance the wallet's injected API is not ready as soon as DOM loads.
        // Force delay web3Enable.
        setTimeout(() => resolve(null), 1000)
      })).then(() => {
        web3Enable('Mock uID Provider').then((exts) => {
          const meshExts = exts.filter(ext => ext.name === 'polywallet')
          console.log('>>>> Extension', meshExts)

          if (!meshExts.length) {
            setError(new Error(`Please install Polymesh wallet extension from Chrome store`));
            return;
          }

          const wallet = meshExts[0];
          setPolyWallet(wallet);

          // @ts-ignore
          wallet.network.subscribe((network) => {
            console.log('setNetwork', network.name)
            setNetwork(network.name);
          });

          // @ts-ignore
          wallet.network.get().then(network => setNetwork(network.name));

          // @TODO Fractal
          // Replace calls to web3AccountsSubscribe and web3Accounts with 
          // the following calls, respectively.
          // Note that we cannot specify the ss58Format in this case, so we'll
          // have to recode addresses before consumption.
          web3AccountsSubscribe(_accounts);
          web3Accounts().then(_accounts);
        })
      });
    }
  }, [polyWallet]);

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
        rpc: schema.rpc,
      });

      apiPromise.isReady.then((api) => {
        setApi(api);
      });
    }
  }, [ network ])

  useEffect(() => {
    if (api && address) {
      api.query.identity.keyToIdentityIds(address).then((linkedKeyInfo) => {
        if (!linkedKeyInfo.isEmpty) {
          setDid(linkedKeyInfo.toString());
        }
      })
    }
    
  }, [ api, address ])

  useEffect(() => {
    if (!!address && !!network && polyWallet) {
      polyWallet.uid.isSet().then((data: boolean) => {
        setUidSet(data)
      });
    }
  }, [address, network, polyWallet])

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

  const handleUidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUid(event.target.value);
  }

  const provideUid = async (polyWallet: any, did: string, uid: string) => {
    console.log('>>> uid', uid);

    // @TODO Fractal
    // Make sure to show any errors thrown by uid.provide.
    polyWallet.uid.provide({
      uid,
      did,
      network
    }).then(console.log, setDisappearingError).catch(setDisappearingError);
  }

  const readUid = async (polyWallet: any) => {
    polyWallet.uid.read()
      .then((res: {uid: string, id: number}) => setImportedUid(res.uid), setDisappearingError)
      .catch(setDisappearingError);
  }

  const provideUidFromDid = async (polyWallet: any, did: string) => {
    console.log('Generating uID...');
    const crypto = await import('@polymathnetwork/confidential-identity')
    const mockUIdHex = `0x${crypto.process_create_mocked_investor_uid(did)}`;
    const uid = uuidStringify(hexToU8a(mockUIdHex));

    console.log('>>> uid', uid);

    polyWallet.uid.provide({
      uid,
      did,
      network
    }).then(console.log, setDisappearingError).catch(setDisappearingError);
  }

  const isDev = network !== 'itn';

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
          { uidSet !== undefined && <p>
            UID: {uidSet ? 'true' : 'false'}
          </p> }
          {importedUid && <p>
            UID value: {importedUid}
          </p> }
          { did && 
          <>
            { isDev && <button  onClick={() => provideUidFromDid(polyWallet, did)}>
                Generate a dummy uID and import it to Polymesh wallet
              </button>
            }
            <p>
              <button onClick={() => readUid(polyWallet)}>Read uId from wallet</button>

            </p>

            <p>
              <input name='uid' value={uid} type='text' onChange={handleUidChange} />
              <button onClick={() => provideUid(polyWallet, did, uid)}>Enter uID and import it to Polymesh wallet</button>
            </p>
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
