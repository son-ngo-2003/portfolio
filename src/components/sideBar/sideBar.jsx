import { useEffect, useState, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom'

//css
import styles from './sideBar.module.scss';

//context
import {ThemeContext} from "/src/contexts/themeContext"

//icons
import { RiMenu2Fill } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";

//images
import { avatarImage } from "/src/assets/images";

const sideBar = ({sectionsRef}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isShow, setIsShow] = useState(false);
    const [currentSection, setCurrentSection] = useState('home');
    const sectionsPos = useRef(null);
    const {theme} = useContext(ThemeContext);

    function scrollToSection( section ) {
        if (!section) return;
        
        if (window.location.pathname !== '/') {
            searchParams.set('s', section);
            setSearchParams(searchParams);
            window.location.pathname = '/';
        }
               
        const node = sectionsRef.current.get( section );
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    }

    const handleSroll = (e) => {
        const offset = 100 //offset seen by console.log the position of the section
        const currentPosY = window.scrollY;
        sectionsPos.current.forEach( (value, key) => {
            if ((value) && (currentPosY > value - offset)) {
                setCurrentSection(key);
            }
        })
    }

    const deleteParams = (listParams) => {
        listParams.forEach( (param) => {
            searchParams.delete(param);
        })
        setSearchParams(searchParams);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === '/') {
            sectionsPos.current = new Map();
            sectionsRef.current.forEach((value, key) => {
                const bodyRect = document.body.getBoundingClientRect();
                const rect = value.getBoundingClientRect();
                sectionsPos.current.set(key,  rect.top - bodyRect.top);
            })

            scrollToSection( searchParams.get("s") );
            deleteParams(['s', 'id'])
            window.addEventListener("scroll", handleSroll);
        }
    },[]);

    const getNavItem = (section, insideText) => 
        (<li>
            <button className={`text ${currentSection==section ? styles.underline : ''}`}
                    onClick={()=>{scrollToSection(section)}}
            >{insideText}</button>
        </li>)

    return (
        <>
            <div className={`${styles[theme]} ${styles.sideBar} ${isShow && styles.open}`}> 
                <img  className="horizontal-center" alt="" src={avatarImage.src} />
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

                <button className={`${styles.openButton} flex text`}
                        onClick={ () => { setIsShow(!isShow) } }>
                    {   isShow 
                        ? <MdMenuOpen/>
                        : <RiMenu2Fill />
                    }
                </button>
            </div>

            <div className={`${styles.overlay}`}
                onClick={ () => { setIsShow(!isShow) }}
            ></div>
        </>
    )
}

export default sideBar;
