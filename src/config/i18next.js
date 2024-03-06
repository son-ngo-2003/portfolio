
//translations
import * as tr from '/src/translations';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

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
                blog: tr.blog_en,
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
                blog: tr.blog_fr,
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
                blog: tr.blog_vn,
            },
        },
    })

export { i18next };