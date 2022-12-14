import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import 'moment/locale/fi.js'
import moment from 'moment'

import 'antd/dist/antd.min.css'
import './index.scss'

import { persistor } from 'store/index'
import { PersistGate } from 'redux-persist/lib/integration/react'

moment.locale('fi')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
