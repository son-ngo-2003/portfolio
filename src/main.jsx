import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//translations
import { global_en, global_fr, global_vn } from './translations';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

//context
import {ThemeProvider} from "/src/contexts/themeContext"

i18next
    .use(initReactI18next)
    .init({
        interpolation: {escapeValue: false},
        lng: "en",
        resources: {
            en : {
                global: global_en,
            },
            fr : {
                global: global_fr,
            },
            vn : {
                global: global_vn,
            },
        },
    })

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <I18nextProvider i18n={i18next}>
                <App />
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
