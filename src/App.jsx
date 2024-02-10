import { useRef, useContext, useEffect } from 'react'

// css
import "./styles/_main.scss"
import styles from "./App.module.scss"

//components
import {SideBar} from "./components"

//pages
import {MainPage} from "./pages"

//context
import {ThemeContext} from "/src/contexts/themeContext"

function App() {
    const sectionsRef = useRef(null);

    //theme: light-theme or dark-theme
    const {theme, setTheme} = useContext(ThemeContext); 
    useEffect(()=>{setTheme('dark-theme')},[]);
    
    return (
        <div className={`${theme} background`}>
            <div className={`grid wide`}>
                <SideBar
                    sectionsRef={sectionsRef}
                />
                <div className={`${styles.container} grid`}>
                    <MainPage ref={sectionsRef}/>
                </div>
            </div>
        </div>

    )
}

export default App
