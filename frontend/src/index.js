import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createTheme } from '@mui/material/styles'
import './index.css'
import './app.css'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#88744a'
    },
    secondary: {
      main: '#f44336'
    }
  }
})

const options = {
  timeout: 5000,
  position: positions.MIDDLE,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>     
        <App />
      </Router>
    </AlertProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
