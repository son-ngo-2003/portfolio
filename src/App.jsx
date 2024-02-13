import { useRef, useContext, useEffect } from 'react'

// css
import "./styles/_main.scss"
import styles from "./App.module.scss"

//components
import {SideBar, FunctionalButton} from "./components"

//pages
import {MainPage} from "./pages"

//context
import {ThemeContext} from "/src/contexts/themeContext"

function App() {
    const sectionsRef = useRef(null);
    
    //theme: light-theme or dark-theme
    const themesAvailable = ['light-theme', 'dark-theme']
    const {theme, setTheme} = useContext(ThemeContext); 

    //translation available
    const languagesAvailable = ['en', 'fr', 'vn'];

    const functionList = ['light-dark', 'language', 'contact', 'go-top']
    
    return (
        <div className={`${theme} background`}>
            <div className={`grid wide`}>
                <SideBar
                    sectionsRef={sectionsRef}
                />
                <FunctionalButton
                    functionList = {functionList}
                    languageList = {languagesAvailable}
                    themeList = {themesAvailable}
                    sectionsRef = {sectionsRef}
                />
                <div className={`${styles.container} grid`}>
                    <MainPage ref={sectionsRef}/>
                </div>
            </div>
        </div>

    )
}

export default App
