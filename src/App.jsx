import { useRef, useContext } from 'react'
import { Routes, Route } from "react-router-dom"

// css
import "./styles/_main.scss"
import styles from "./App.module.scss"

//components
import {SideBar, FunctionalButton} from "./components"

//pages
import {MainPage, BlogPage, BlogAdmin, NotFoundPage} from "./pages"

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
                    <Routes>
                        <Route path="/blog" element={<BlogPage/>} />
                        <Route path="/admin/blog" element={<BlogAdmin/>} />
                        <Route path="/" element={<MainPage ref={sectionsRef}/>} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default App
