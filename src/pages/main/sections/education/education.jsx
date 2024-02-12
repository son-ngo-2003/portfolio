import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./education.module.scss"

//components
import { TextBox } from "/src/components"

//icons
import { RiSearchEyeLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { TbSettingsCode } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa6";

const ServicesSection = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("education");

    const iconList = [<RiSearchEyeLine />, <BiTask />, <TbSettingsCode />, <HiOutlineLightBulb /> ]
    const educationList = t('education.education', {returnObjects: true})
                            .map( ( value, key ) => ({
                                title: value.title,
                                text: value.text,
                                years: value.years
                            }));

    return (
        <div ref={ref} className={`${styles.skills} section`}>
            <div className={`welcome`}>
                <h3 className="sub-title">{t("education.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("education.introduction.title")}</h1>
            </div>

            <div className={`${styles.educationList} row`}>
                <span className={`${styles.line} bg-component-darker`}></span>
                {  educationList.map( (value, index) => (
                        <div key={index} className={`${styles.educationItem} col l-12`}>
                            <TextBox
                                divClassName= {styles.educationBox}
                                title = {value.title}
                                subTitle = {value.years}
                                text = {value.text}
                            />
                            <span className={`${styles.linePoint} bg-component-darker`}></span>

                        </div>
                    ))
                }
                <span className={`${styles.finalPoint} bg-component-darker`}></span>
            </div>

        </div>
    )
})

export default ServicesSection
