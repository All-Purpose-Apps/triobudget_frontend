import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import EntryPoint from './EntryPoint'
import store from './store/store'
import './assets/css/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EntryPoint />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
