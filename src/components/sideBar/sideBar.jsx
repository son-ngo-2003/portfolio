import { useEffect, useState, useRef } from 'react';

import styles from './sideBar.module.scss';

const sideBar = ({sectionsRef}) => {
    const [currentSection, setCurrentSection] = useState('home');
    const sectionsPos = useRef(null);

    function scrollToSection( section ) {
        const node = sectionsRef.current.get( section );
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    const handleSroll = (e) => {
        const offset = 120 //offset seen by console.log the position of the section
        const currentPosY = window.scrollY;
        sectionsPos.current.forEach( (value, key) => {
            console.log(currentPosY, value - offset)
            if ((value) && (currentPosY > value - offset))
                setCurrentSection(key);
        })
    }

    useEffect(() => {
        sectionsPos.current = new Map();
        sectionsRef.current.forEach((value, key) => {
            const bodyRect = document.body.getBoundingClientRect();
            const rect = value.getBoundingClientRect();
            sectionsPos.current.set(key,  rect.top - bodyRect.top);
        })

        console.log(sectionsPos.current);

        window.addEventListener("scroll", handleSroll);
        //return window.removeEventListener("scroll", handleSroll);
    },[]);

    const getNavItem = (section, insideText) => 
        (<li>
            <button className={`text ${currentSection==section ? styles.underline : ''}`}
                    onClick={()=>{scrollToSection(section)}}
            >{insideText}</button>
        </li>)

    return (
        <div className={`${styles.sideBar}`}>
            <img  className="horizontal-center" alt="" />
            <h2   className='text'>NGO Truong Son</h2>
            <p    className='text'>3rd student at INSA</p>

            <ul className="text">
                {getNavItem("home",         "Home")}
                {getNavItem("about",        "About Me")}
                {getNavItem("services",     "Services")}
                {getNavItem("skills",       "Skills")}
                {getNavItem("education",    "Education")}
                {getNavItem("projects",     "Projects")}
                {getNavItem("activities",   "Activities - Interests")}
                {getNavItem("contact",      "Contact ")}
            </ul>
        </div>
    )
}

export default sideBar;
