import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

//translations
import { i18next } from '/src/config/i18next.js';
import { I18nextProvider } from 'react-i18next';

//context
import {ThemeProvider} from "/src/contexts/themeContext"

//animated on scroll library
import '/src/config/aos.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <I18nextProvider i18n={i18next}>
                    <App />
                </I18nextProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
