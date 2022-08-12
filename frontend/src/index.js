import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  type: types.INFO,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
