import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ------ Bootstrap ------
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ------ Styles ------
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
