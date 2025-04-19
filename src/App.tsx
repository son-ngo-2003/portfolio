import { useRef, useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { MainPage, BlogPage, AdminPage, BlogAdmin, NotFoundPage, TestPage } from "./pages";

// css
import "./styles/_main.scss"
import styles from "./App.module.scss"

//components
import {SideBar, FunctionalButton, type ButtonFunctionType} from "./components"

//context
import {ThemeContext} from "@src/contexts/themeContext"

export interface AppRoutesRef {
    sectionsRef: Map<string, HTMLElement>;
}

function App() {
    const appRoutesRef = useRef<AppRoutesRef | null>(null);
    
    //theme: light-theme or dark-theme
    const {theme, setTheme} = useContext(ThemeContext); 
    const functionList : ButtonFunctionType[] = ['light-dark', 'language', 'contact', 'go-top']

    return (
        <div className={`${theme} background`}>
            <div className={`grid wide`}>
                <SideBar
                    appRoutesRef={appRoutesRef}
                />
                
                <FunctionalButton
                    functionList = {functionList}
                    // sectionsRef = {sectionsRef}
                />
                
                <div className={`${styles.container} grid`}>
                    <Routes>
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/blog" element={<BlogAdmin/>} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/" element={<MainPage ref={ appRoutesRef }/>} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default App
