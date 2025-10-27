import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "keen-slider/keen-slider.min.css";
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
     <Provider store={store}>
    <App />
    </Provider>
    </AuthProvider>
  </StrictMode>,
)
