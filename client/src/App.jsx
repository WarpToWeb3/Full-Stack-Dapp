import { useState,useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import chai from "./chainwarp.png";
import './App.css'
import { ConnectWallet } from "@thirdweb-dev/react";

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0xa64e3144835aF8781c750ceC432784a68d883266";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div >
    <div style={{ textAlign: 'center' }}>
      <img
        src={chai}
        className="img-fluid"
        alt=".."
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div className="connect">
          <ConnectWallet className="connect-button" btnTitle="Connect Wallet" dropdownPosition={{
            align: 'center',
            side: 'bottom',
          }}
           />
        </div>

      <p>
        <h1>Connected Account - {account}</h1>
      </p>
    </div>
    
    
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
  )
}

export default App
