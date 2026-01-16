import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import 'react-phone-input-2/lib/style.css';
import './index.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
