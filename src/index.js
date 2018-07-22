import React from 'react'
import { render} from 'react-dom'
import './css/index.css'
import App from './component/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './storeConfig'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import 'velocity-animate/velocity.ui.min'
import 'react-spinkit'

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
