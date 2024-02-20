import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./skills.module.scss"

//components
import { Accordion } from "/src/components"

//icons
import { RiSearchEyeLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { TbSettingsCode } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa6";

const ServicesSection = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("skills");

    const iconList = [<RiSearchEyeLine />, <BiTask />, <TbSettingsCode />, <HiOutlineLightBulb /> ]
    const skillsList = t('skills.skills', {returnObjects: true})
                            .map( ( value, key ) => ({
                                title: value.title,
                                text: value.text,
                                icon: iconList[key] || <FaQuestion />
                            }));

    const separateList = (list) => {
        const middleIndex = Math.ceil(list.length / 2);
        return [list.slice(0, middleIndex), list.slice(middleIndex)];
    };

    let [leftSkillsList, rightSkillsLists] = separateList(skillsList);

    return (
        <div ref={ref} className={`${styles.skills} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title">{t("skills.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("skills.introduction.title")}</h1>
                <p className={`text`}>{t("skills.introduction.text")}</p>
            </div>

            <div className={`${styles.skillsList} row`}>
                <div className={`${styles.listContainer} col l-6`}>
                    <div className={`${styles.leftPart} flex`}>
                        {  leftSkillsList.map( (value, index) => (
                                <div key={index} className="flex">
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

                <div className={`${styles.listContainer} col l-6`}>
                    <div className={`${styles.rightPart}`}>
                        {  rightSkillsLists.map( (value, index) => (
                                <div key={index} className="flex">
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

            {/* Mobile version */}
            <div className={`${styles.listContainer} col l-12 m-12 c-12`}>
                <div className={`${styles.skillsListMobile}`}>
                {  skillsList.map( (value, index) => (
                        <div key={index} className="flex">
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
