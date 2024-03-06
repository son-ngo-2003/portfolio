import { useEffect, useState, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";

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
    const [t, i18n] = useTranslation("global");
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
        const offset = window.innerHeight * 0.4;
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
            const bodyRect = document.body.getBoundingClientRect();

            sectionsRef.current.forEach((value, key) => {
                const rect = value.getBoundingClientRect();
                sectionsPos.current.set(key,  rect.y - bodyRect.y);
            })

            scrollToSection( searchParams.get("s") );
            deleteParams(['s', 'id'])
            window.addEventListener("scroll", handleSroll);
        }
    },[sectionsRef.current]);

    const getNavItem = (section, insideText) => 
        (<li>
            <button className={`text ${currentSection==section ? styles.underline : ''}`}
                    onClick={()=>{scrollToSection(section)}}
            >{insideText}</button>
        </li>)

    return (
        <>
            <div className={`${styles[theme]} ${styles.sideBar} ${isShow && styles.open}`}> 
                <div data-aos="flip-left">
                    <img  className="horizontal-center" alt="" src={avatarImage.src} />
                </div>
                <h2   className='text' data-aos="fade-up" data-aos-delay="100">{t("sidebar.introduction.name")}</h2>
                <p    className='text' data-aos="fade-up" data-aos-delay="200">{t("sidebar.introduction.intro1")}</p>
                <p    className='text' data-aos="fade-up" data-aos-delay="300">{t("sidebar.introduction.intro2")}</p>

                <ul className="text" data-aos="zoom-in" data-aos-delay="400">
                    {getNavItem("home",         t("sidebar.navigation.home"))}
                    {getNavItem("about",        t("sidebar.navigation.about"))}
                    {getNavItem("services",     t("sidebar.navigation.services"))}
                    {getNavItem("skills",       t("sidebar.navigation.skills"))}
                    {getNavItem("education",    t("sidebar.navigation.education"))}
                    {getNavItem("projects",     t("sidebar.navigation.projects"))}
                    {getNavItem("activities",   t("sidebar.navigation.activities"))}
                    {getNavItem("contact",      t("sidebar.navigation.contact"))}
                </ul>

                <button className={`${styles.openButton} flex text`}
                        onClick={ () => { setIsShow(!isShow) } }>
                    <i className={`${isShow ? styles.show : styles.hide }`}><MdMenuOpen/></i>
                    <i className={`${!isShow ? styles.show  : styles.hide}`}><RiMenu2Fill /></i>
                </button>
            </div>

            <div className={`${styles.overlay}`}
                onClick={ () => { setIsShow(!isShow) }}
            ></div>
        </>
    )
}

export default sideBar;
