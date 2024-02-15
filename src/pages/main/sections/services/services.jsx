import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./services.module.scss"

//components
import { Accordion } from "/src/components"

//icons
import { FaServer } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { ImAndroid } from "react-icons/im";
import { FaCode } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";

const ServicesSection = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("services");

    const iconList = [<RiReactjsLine />, <FaServer />, <ImAndroid />, <FaCode /> ]
    const servicesList = t('services.services', {returnObjects: true})
                            .map( ( value, key ) => ({
                                title: value.title,
                                text: value.text,
                                icon: iconList[key] || <FaQuestion />
                            }));

    return (
        <div ref={ref} className={`${styles.services} section row`}>
            <div className={`${styles.welcome} col l-6 m-12 c-12`}>
                <h3 className="sub-title">{t("services.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("services.introduction.title")}</h1>
                <p className={`${styles.introductionText} text`}>{t("services.introduction.text")}</p>
            </div>

            <div className={`col l-6 m-12 c-12`}>
                <div className={`${styles.servicesList}`}>
                    {  servicesList.map( (value, index) => (
                            <div key={index} className="">
                                <Accordion
                                    icon = {value.icon}
                                    title = {value.title}
                                    text = {value.text}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})

export default ServicesSection
