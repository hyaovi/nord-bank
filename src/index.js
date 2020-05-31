import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { FirebaseContext, firebase } from './Firebase';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={firebase}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
