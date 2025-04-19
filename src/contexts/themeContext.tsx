import { ReactNode, useEffect } from "react";
import { AppTheme, getTheme, getThemeFromLocalStorage } from "@src/types/theme";
import { createContext, useState } from "react";

interface ThemeContextType {
    theme: AppTheme;
    setTheme?: (theme: AppTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ 
    theme: getThemeFromLocalStorage(),
    setTheme: undefined,
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState( getThemeFromLocalStorage() );

    useEffect(() => {
        document.documentElement.setAttribute('data-color-mode', theme == AppTheme.LIGHT ? 'light' : 'dark');
    }, [theme])

    return (
        <ThemeContext.Provider value = { {theme, setTheme} }>
            {children}
        </ThemeContext.Provider>
    )
}