import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import AlertMUITemplate from "react-alert-template-mui"
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { positions, Provider as AlertProvider } from 'react-alert'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import './app.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#88744a'
    },
    danger: {
      main: 'red'
    }
  }
})

const options = {
  position: positions.MIDDLE
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AlertProvider template={AlertMUITemplate} {...options}>
        <Router>     
          <App />
        </Router>
      </AlertProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
