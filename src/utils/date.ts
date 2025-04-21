import { Language } from "@src/types/languages";

export const toLocalString = (date: Date | null, lang: Language | string, defaultValue = 'current') => {
    if (!date) {
        return defaultValue;
    }

    return date.toLocaleDateString(lang, {        
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}
