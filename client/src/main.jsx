import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// favicon
import Favicon from './assets/DumbMerch.png'
const favicon = document.getElementById('idFavicon')
favicon.setAttribute('href', Favicon)

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
)