import { forwardRef, useRef, useImperativeHandle } from 'react'

//sections
import {Home, About, ServicesSection, Skills, Education} from "./sections";

const MainPage = forwardRef((props, ref) => {
    const sectionsRef = useRef(null);
    useImperativeHandle(ref, () => sectionsRef.current, []);

    function getSectionsRef () {
        if (!sectionsRef.current) {
            sectionsRef.current = new Map();
        }
        return sectionsRef.current;
    }

    return (
        <>
            <Home 
                ref={(node) => {getSectionsRef().set('home', node);}
            }/>
            <About 
                ref={(node) => {getSectionsRef().set('about', node);}
            }/>
            <ServicesSection 
                ref={(node) => {getSectionsRef().set('services', node);}
            }/>
            <Skills 
                ref={(node) => {getSectionsRef().set('skills', node);}
            }/>
            <Education 
                ref={(node) => {getSectionsRef().set('education', node);}
            }/>
        </>
    )
})

export default MainPage
