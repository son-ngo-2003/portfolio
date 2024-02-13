import { createContext, useState } from "react";

export const ThemeContext = createContext({ theme: localStorage.getItem('theme') || "light-theme", setTheme: undefined }); //undefined will be use for function setTheme

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light-theme");
    return (
        <ThemeContext.Provider value = { {theme, setTheme} }>
            {children}
        </ThemeContext.Provider>
    )
}