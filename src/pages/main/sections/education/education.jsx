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
                                years: value.years,
                                href: value.href,
                            }));

    return (
        <div ref={ref} className={`${styles.education} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("education.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("education.introduction.title")}</h1>
            </div>
            <div className="row">
                <div className={`${styles.educationList} col l-12 m-12 x-12`}>
                    <span className={`${styles.line} bg-component-darker`}
                        data-aos="zoom-in-up" data-aos-delay="50"
                    ></span>
                    {  educationList.map( (value, index) => (
                            <div key={index} className={`${styles.educationItem}`}>

                                <div data-aos="zoom-in-left" data-aos-delay="150">
                                    <TextBox
                                        divClassName= {styles.educationBox}
                                        title = {value.title}
                                        subTitle = {value.years}
                                        text = {value.text}
                                        href = {value.href || ''}
                                    />
                                </div>

                                <div className={`${styles.linePoint} bg-component-darker`}
                                    data-aos="zoom-in" data-aos-delay="150"
                                ></div>

                            </div>
                        ))
                    }
                    <span className={`${styles.finalPoint} bg-component-darker`}
                            data-aos="zoom-in" data-aos-delay="150"
                    ></span>
                </div>
            </div>

        </div>
    )
})

export default ServicesSection
