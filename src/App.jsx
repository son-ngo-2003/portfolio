import { useRef } from 'react'

// css
import "./styles/_main.scss"
import styles from "./App.module.scss"

//components
import {SideBar} from "./components"

//pages
import {MainPage} from "./pages"

//icons

function App() {
    const sectionsRef = useRef(null);

    return (
        <div className="light-theme background">
            <div className={`grid wide light-theme`}>
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
