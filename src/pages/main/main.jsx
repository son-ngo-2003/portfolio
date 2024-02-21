import { forwardRef, useRef, useImperativeHandle, useState } from 'react'

//sections
import {Home, About, ServicesSection, Skills, 
        Education, Projects, Activities, Contact} from "./sections";

const MainPage = forwardRef((props, ref) => {
    const sectionsRef = useRef(null);
    const [projectsRef, setProjectRef] = useState(null);
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
                ref={(node) => {getSectionsRef().set('home', node);}}
                projectsRef={projectsRef}
            />
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
            <Projects 
                ref={(node) => {getSectionsRef().set('projects', node); setProjectRef(node);}
            }/>
            <Activities 
                ref={(node) => {getSectionsRef().set('activities', node);}
            }/>
            <Contact 
                ref={(node) => {getSectionsRef().set('contact', node);}
            }/>
        </>
    )
})

export default MainPage
