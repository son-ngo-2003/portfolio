import { forwardRef, useRef, useImperativeHandle, useState, useEffect, RefObject } from 'react';

//sections
import {
    Home, About, ServicesSection, Skills,
    Education, Projects, Activities, Contact
} from "./sections";

// Define interfaces
interface MainPageProps {
    /** Reference passed from parent component */
    ref?: React.Ref<{ sectionsRef: Map<string, HTMLElement> }>;
}

interface SectionsRefMap extends Map<string, HTMLElement> {}

const MainPage = forwardRef<{ sectionsRef: SectionsRefMap }, MainPageProps>(
    (props, ref) => {
        const sectionsRef = useRef<SectionsRefMap>(new Map());
        const projectsRef = useRef<HTMLElement | null>(null);

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
                    projectsRef={ projectsRef }
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
                    ref={(node) => { updateSectionRef('projects', node); projectsRef.current = node; }}
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