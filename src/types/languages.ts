export enum Language {
    EN = 'en',
    FR = 'fr',
    VN = 'vn',
}

export const languageList = Object.values(Language);

export function getLanguageStrEn(lang: Language) {
    switch (lang) {
        case Language.EN:
            return "English";
        case Language.FR:
            return "French";
        case Language.VN:
            return "Vietnamese";
    }
}