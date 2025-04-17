import { forwardRef, useRef, useImperativeHandle, useState, useEffect, RefObject } from 'react';

//sections
import {
    Home, About, ServicesSection, Skills,
    Education, Projects, Activities, Contact
} from "./sections";

// Define interfaces
interface MainPageProps {
    /** Reference passed from parent component */
    ref?: React.Ref<{ sectionsRef: Map<string, HTMLDivElement> }>;
}

interface SectionsRefMap extends Map<string, HTMLDivElement> {}

const MainPage = forwardRef<{ sectionsRef: SectionsRefMap }, MainPageProps>(
    (props, ref) => {
        const sectionsRef = useRef<SectionsRefMap>(new Map());

        useImperativeHandle(ref, () => {
            return { sectionsRef: sectionsRef.current };
        }, [sectionsRef.current]);

        function getSectionsRef(): SectionsRefMap {
            if (!sectionsRef.current) {
                throw new Error("sectionsRef is not initialized");
            }
            return sectionsRef.current;
        }

        function updateSectionRef(key: string, value: HTMLDivElement | null): void {
            if (value) {
                getSectionsRef().set(key, value);
            }
        }

        return (
            <>
                <Home
                    ref={(node) => { updateSectionRef('home', node); }}
                    projectsRef={ sectionsRef.current.get('projects') }
                />
                <About
                    ref={(node) => { updateSectionRef('about', node); }}
                />
                <ServicesSection
                    ref={(node) => { updateSectionRef('services', node); }}
                />
                <Skills
                    ref={(node) => { updateSectionRef('skills', node); }}
                />
                <Education
                    ref={(node) => { updateSectionRef('education', node); }}
                />
                <Projects
                    ref={(node) => { updateSectionRef('projects', node); }}
                />
                <Activities
                    ref={(node) => { updateSectionRef('activities', node); }}
                />
                <Contact
                    ref={(node) => { updateSectionRef('contact', node); }}
                />
            </>
        );
    }
);

MainPage.displayName = 'MainPage';

export default MainPage;