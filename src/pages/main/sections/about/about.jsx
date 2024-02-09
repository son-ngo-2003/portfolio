import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./about.module.scss"

//components
import { ExpandableBox } from "/src/components"

//icons
import { RiSearchEyeLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { TbSettingsCode } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa6";

const About = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("global");

    const iconList = [<RiSearchEyeLine />, <BiTask />, <TbSettingsCode />, <HiOutlineLightBulb /> ]
    const nbStrengths = 4;
    const strengthsList = [];
    for ( let i = 0; i < nbStrengths; i++) {
        const posTranslation = `about.strengths.${i}`;
        strengthsList[i] = {
            title: t(`${posTranslation}.title`),
            text: t(`${posTranslation}.text`),
            icon: iconList[i] || <FaQuestion />
        }
    }

    return (
        <div ref={ref} className={`${styles.about} section`}>
            <div className={`welcome`}>
                <h3 className="sub-title">{t("about.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("about.introduction.title")}</h1>
                <p className="text">{t("about.introduction.text")}</p>
            </div>

            <div className={`${styles.strengths} row`}>
                {  strengthsList.map( (value, index) => (
                        <div className="col l-3">
                            <ExpandableBox
                                icon = {value.icon}
                                title = {value.title}
                                text = {value.text}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
})

export default About
