import './client/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './client/App'

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
