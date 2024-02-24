import { forwardRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./home.module.scss"

//services
import {getInfo} from '/src/services/infoServices'

//components
import { Button } from "/src/components"

//icons
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";

//images
import { homeImage } from "/src/assets/images";

//context
import {ThemeContext} from "/src/contexts/themeContext"

const Home = forwardRef(( {projectsRef={}}, ref ) => {
    const [t, i18n] = useTranslation("global");
    const {theme} = useContext(ThemeContext);
    const [linkCV, setLinkCV] = useState();
    const betaCVLink = "https://drive.google.com/file/d/17POE18amlH1-F-jOE4B25AdliaAay2ER/view?usp=sharing"

    useEffect(() => {
        (async () => {
            const data = await getInfo();
            setLinkCV(data?.cv[i18n.language] || data?.cv["en"] || betaCVLink);
        })();
    }, [i18n.language]);

    return (
        <div ref={ref} className={`${styles.home} row section`}>
            <div className={`${styles.leftPart} col l-6 m-12 c-12`}>
                <div className={`welcome`}>
                    <h3 className="sub-title">{t("home.welcome.sub-title")}</h3>
                    <h1 className="title">{t("home.welcome.name")}</h1>
                    <p className="text">{t("home.welcome.text")}</p>
                </div>
                <div className={`${styles.buttonsContainer}`}>
                    <a href={linkCV}
                        target="_blank">
                        <Button
                            divClassName={styles.button}
                            text={t("home.buttons.download-CV")}
                            icon={<IoDownloadOutline />}
                        />
                    </a>

                    <Button
                        divClassName={styles.button}
                        text={t("home.buttons.discover")}
                        icon={<MdOutlineWorkOutline />}
                        onClick={ () => { 
                            console.log(projectsRef)
                            projectsRef.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'center'
                        });}}
                    />
                </div>
            </div>

            <div className={`${styles.rightPart} ${styles[theme]} col l-6 m-12 c-12`}>
                <div className={`${styles.overlay}`}>
                    <div className={`${styles.hole} horizontal-center background`}></div>
                    <img src={homeImage.src} alt="" />
                </div>

                <div className={`${styles.nameplate}`}>
                    <h3>NGO Truong Son</h3>
                    <p>18/03/2003</p>
                </div>
            </div>
        </div>
    )
})

export default Home
