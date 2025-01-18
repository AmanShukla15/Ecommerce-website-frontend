import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './app/store';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import theme from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Auth0Provider
          domain="dev-fzxjja1kyr5d58i2.us.auth0.com"
          clientId="vmWBGoI9ybqrRvkV0LDRy0k657ooA4k8"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
          <ToastContainer position='top-right' autoClose={1500} closeOnClick />
        </Auth0Provider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

