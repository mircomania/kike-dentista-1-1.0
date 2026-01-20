import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import 'react-phone-input-2/lib/style.css';

import './index.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="kike-dentista-1-1.0">
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </BrowserRouter>,
);
