import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx'

//translations
import { i18next } from '@src/config/i18next';
import { I18nextProvider } from 'react-i18next';

//context
import {ThemeProvider} from "@src/contexts/themeContext"

//animated on scroll library
// import '@src/config/aos';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <I18nextProvider i18n={i18next}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
