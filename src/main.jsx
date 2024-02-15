import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

//translations
import * as tr from './translations';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

//context
import {ThemeProvider} from "/src/contexts/themeContext"

i18next
    .use(initReactI18next)
    .init({
        interpolation: {escapeValue: false},
        lng: localStorage.getItem('language') || "en",
        resources: {
            en : {
                global: tr.global_en,
                about: tr.about_en,
                services: tr.services_en,
                skills: tr.skills_en,
                education: tr.education_en,
                projects: tr.projects_en,
                activities: tr.activities_en,
                contact: tr.contact_en,
            },
            fr : {
                global: tr.global_fr,
                about: tr.about_fr,
                services: tr.services_fr,
                skills: tr.skills_fr,
                education: tr.education_fr,
                projects: tr.projects_fr,
                activities: tr.activities_fr,
                contact: tr.contact_fr,
            },
            vn : {
                global: tr.global_vn,
                about: tr.about_vn,
                services: tr.services_vn,
                skills: tr.skills_vn,
                education: tr.education_vn,
                projects: tr.projects_vn,
                activities: tr.activities_vn,
                contact: tr.contact_vn,
            },
        },
    })

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
