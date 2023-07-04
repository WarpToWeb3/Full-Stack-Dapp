import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="ethereum">
      <App />
    </ThirdwebProvider>
    
  </React.StrictMode>,
)
