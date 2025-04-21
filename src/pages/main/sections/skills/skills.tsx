import { forwardRef, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./skills.module.scss";

//components
import { Accordion } from "@src/components";

//icons
import { FaQuestion } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { DiAndroid } from "react-icons/di";
import { FaGitSquare } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { PiGraphDuotone } from "react-icons/pi";
import { MdDraw } from "react-icons/md";

// Define types for skill items
interface SkillItem {
    id: number;
    title: string;
    text: string;
    icon: ReactNode;
}

interface SkillTranslation {
    title: string;
    text: string;
}

const SkillsSection = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("skills");
    const [ openAccordion, setOpenAccordion ] = useState<number | null>(null);

    const iconList: ReactNode[] = [
        <FaCode key="code" />, 
        <FaDatabase key="database" />, 
        <FiGlobe key="web" />, 
        <DiAndroid key="mobile" />,
        <FaGitSquare key="git" />, 
        <FaDocker key="docker" />, 
        <PiGraphDuotone key="design" />, 
        <MdDraw key="draw" />
    ];
    
    const skillsList: SkillItem[] = (t('skills.skills', {returnObjects: true}) as SkillTranslation[])
        .map((value: SkillTranslation, key: number) => ({
            id: key,
            title: value.title,
            text: value.text,
            icon: iconList[key] || <FaQuestion key="default" />
        }));

    const separateList = <T extends unknown>(list: T[]): [T[], T[]] => {
        const middleIndex = Math.ceil(list.length / 2);
        return [list.slice(0, middleIndex), list.slice(middleIndex)];
    };

    const [leftSkillsList, rightSkillsLists] = separateList(skillsList);

    return (
        <div ref={ref} className={`${styles.skills} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("skills.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("skills.introduction.title")}</h1>
                <p className={`text`} data-aos="fade-right" data-aos-delay="250">{t("skills.introduction.text")}</p>
            </div>

            <div className={`${styles.skillsList} row`}>
                <div className={`${styles.listContainer} col l-6`}>
                    <div className={`${styles.leftPart} flex`}>
                        {leftSkillsList.map((value, index) => (
                            <div 
                                key={index} 
                                className="flex"
                                data-aos="fade-up" 
                                data-aos-delay={250 + index * 100}
                            >
                                <Accordion
                                    isOpen={openAccordion === value.id}
                                    onClick={() => setOpenAccordion(openAccordion === value.id ? null : value.id)}

                                    icon={value.icon}
                                    title={value.title}
                                    text={value.text}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.listContainer} col l-6`}>
                    <div className={`${styles.rightPart}`}>
                        {rightSkillsLists.map((value, index) => (
                            <div 
                                key={index} 
                                className="flex"
                                data-aos="fade-up" 
                                data-aos-delay={400 + index * 100}
                            >
                                <Accordion
                                    isOpen={openAccordion === value.id}
                                    onClick={() => setOpenAccordion(openAccordion === value.id ? null : value.id)}

                                    icon={value.icon}
                                    title={value.title}
                                    text={value.text}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className={`${styles.listContainer} col l-12 m-12 c-12`}>
                <div className={`${styles.skillsListMobile}`}>
                    {skillsList.map((value, index) => (
                        <div 
                            key={index} 
                            className="flex"
                            data-aos="fade-up" 
                            data-aos-delay={400 + index * 100}
                        >
                            <Accordion
                                isOpen={openAccordion === value.id}
                                onClick={() => setOpenAccordion(openAccordion === value.id ? null : value.id)}

                                icon={value.icon}
                                title={value.title}
                                text={value.text}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;