import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Background from "./Theme/Background"
import { ThemeProvider } from './Contexts/ThemeContext'
import './Assets/Styles/Index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Background>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Background>
  </BrowserRouter>
</React.StrictMode>
)
