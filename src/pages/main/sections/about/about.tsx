import { forwardRef, ReactNode } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./about.module.scss";

//components
import { ExpandableBox } from "@src/components";

//icons
import { RiSearchEyeLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { TbSettingsCode } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa6";

// Define types for strength items
interface StrengthItem {
    title: string;
    text: string;
    icon: ReactNode;
}

const About = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("about");

    const iconList: ReactNode[] = [
        <RiSearchEyeLine key="search" />, 
        <BiTask key="task" />, 
        <TbSettingsCode key="code" />, 
        <HiOutlineLightBulb key="bulb" />
    ];
    
    const strengthsList: StrengthItem[] = (t('about.strengths', {returnObjects: true}) as Array<{ title: string, text: string }>)
        .map((value: { title: string, text: string }, key: number) => ({
            title: value.title,
            text: value.text,
            icon: iconList[key] || <FaQuestion key="default" />
        }));

    const renderParagraphs = (inputString: string): JSX.Element[] => {
        const paragraphs = inputString.split("/n");
        return paragraphs.map((paragraph: string, index: number) => (
            <p 
                key={index} 
                className="text" 
                data-aos="fade-right" 
                data-aos-delay={250 + index * 100}
            >
                {paragraph}
            </p>
        ));
    };

    return (
        <div ref={ref} className={`${styles.about} section`}>
            <div className={`${styles.welcome}`}>
                <h3 
                    className="sub-title" 
                    data-aos="fade-right" 
                    data-aos-delay="50"
                >
                    {t("about.introduction.sub-title")}
                </h3>
                
                <h1 
                    className="title maj" 
                    data-aos="fade-right" 
                    data-aos-delay="150"
                >
                    {t("about.introduction.title")}
                </h1>
                
                {renderParagraphs(t("about.introduction.text"))}
            </div>

            <div className={`${styles.strengths} row`}>
                {strengthsList.map((value: StrengthItem, index: number) => (
                    <div 
                        key={index} 
                        className={`${styles.strengthBox} flex col l-3 m-6 c-6`}
                        data-aos="flip-right" 
                        data-aos-delay={350 + index * 100}
                    >
                        <ExpandableBox
                            icon={value.icon}
                            title={value.title}
                            text={value.text}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

About.displayName = 'About';

export default About;