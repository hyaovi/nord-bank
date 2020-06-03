import React from 'react';
import ReactDOM from 'react-dom';
import './sass/bootstrap.scss';
import './sass/index.scss';
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

serviceWorker.unregister();
