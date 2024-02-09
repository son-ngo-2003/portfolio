import { forwardRef } from "react";

import { useTranslation } from "react-i18next";

// css
import styles from "./home.module.scss"

//components
import { Button } from "/src/components"

//icons
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";

//images
import { homeImage } from "/src/assets/images/image";

const Home = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("global");

    return (
        <div ref={ref} className={`${styles.home} row`}>
            <div className={`${styles.leftPart} col l-6`}>
                <div className={`welcome`}>
                    <h3 className="sub-title">{t("home.welcome.sub-title")}</h3>
                    <h1 className="title">{t("home.welcome.name")}</h1>
                    <p className="text">{t("home.welcome.text")}</p>
                </div>
                <Button
                    divClassName={styles.buttons}
                    text={t("home.buttons.download-CV")}
                    icon={<IoDownloadOutline />}
                />

                <Button
                    divClassName={styles.buttons}
                    text={t("home.buttons.discover")}
                    icon={<MdOutlineWorkOutline />}
                />
            </div>

            <div className={`${styles.rightPart} col l-6`}>
                <div className={`${styles.overlay}`}>
                    <div className={`${styles.hole} horizontal-center`}></div>
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
