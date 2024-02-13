import { useContext, useEffect, useState, useRef } from 'react';
import i18next from 'i18next';

//components
import { ButtonElement } from './';

//css
import styles from './functionalButton.module.scss';

//context
import { ThemeContext } from "/src/contexts/themeContext"

//icons
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { TiArrowUpThick } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { RiMenu5Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

//images
import { flags } from '/src/assets/images'


const FunctionalButton = ({ functionList = ['light-dark', 'language', 'contact', 'go-top'], 
                  languageList = ['en', 'fr', 'vn'], sectionsRef, 
                  themeList = ['light-theme', 'dark-theme'],
                  divClassName='' }) => {

    const [isShown, setIsShown] = useState(true)
    const [isCombined, setIsCombined] = useState(true) //for mobile
    const posY = useRef(window.scrollY);
    const length = functionList.length;


    const {theme, setTheme} = useContext(ThemeContext); 
    const themeIconList = [
        {value: <FaSun/>, type: "icon"},
        {value: <FaMoon/>, type: "icon"}
    ]

    const contactList = [{value: <IoPerson/>, type: "icon"},]
    const goTopList = [{value: <TiArrowUpThick/>, type: "icon"},]
    const flagsList = languageList.map( (lang) => ({
        type: "image",
        value: flags[lang].src,
    }) )
    const menuList = [
        {value: <RiMenu5Line/>, type: "icon"},
        {value: <IoClose/>, type: "icon"},]

    function scrollToSection( section ) {
        const node = sectionsRef.current.get( section );
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    }

    const handleScroll = () => {
        const newPosY = window.scrollY;
        setIsShown(newPosY < posY.current);
        posY.current = newPosY;
        setIsCombined(true);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const choseButton = (func) => {
        switch (func) {
            case 'language':
                return <ButtonElement listAssets={flagsList}
                                        setIndex={languageList.findIndex( (e) => e == localStorage.getItem('language') )}
                                        onClick={(selectedIndex) => {
                                                i18next.changeLanguage(languageList[selectedIndex]);
                                                localStorage.setItem('language', languageList[selectedIndex])}}/>
            case 'light-dark':
                return <ButtonElement listAssets={themeIconList}
                                        setIndex={themeList.findIndex( (e) => e == localStorage.getItem('theme'))}
                                        onClick={(selectedIndex) => {
                                                setTheme( themeList[selectedIndex] ),
                                                localStorage.setItem('theme', themeList[selectedIndex])}}/>
            case 'contact':
                return <ButtonElement listAssets={contactList}
                                        onClick={() => {scrollToSection('contact')}}/>
            case 'go-top':
                return <ButtonElement listAssets={goTopList}
                                        onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}/>
            case 'menu': 
                return <ButtonElement listAssets={menuList}
                                        setIndex = {+(!isCombined)}
                                        onClick={() => {setIsCombined(!isCombined)}}/>
        }
    }

    return (
        <div className={`${styles.fbutton} ${styles[theme]} ${divClassName} ${isShown ? '' : styles.hide}`}>
            <div className={`${styles.desktop}`}>
                <div className={`${styles.outside} flex`}>
                    {choseButton( functionList[length-1] )}
                </div>
                <ul className={`${styles.overlay}`}>
                    {functionList.map((func, index)=>
                        (index < length-1) && 
                        <li key={index}>{choseButton( func )}</li>
                    )}
                </ul>
            </div>

            <div className={`${styles.mobile} ${isCombined ? styles.close : '' }`}>
                <ul className={`${styles.container} `}>
                    {functionList.map((func, index)=>
                        (index < length-1) && 
                        <li className={`${styles.outside} flex`} key={index}>{choseButton( func )}</li>
                    )}
                </ul>
                <div className={`${styles.overlay}`}>
                    {choseButton( 'menu' )}
                </div>
            </div>
        </div>
    )
}

export default FunctionalButton;
