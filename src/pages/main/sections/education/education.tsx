import { forwardRef, ReactNode } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./education.module.scss";

//components
import { TextBox } from "@src/components";

//icons
import { RiSearchEyeLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { TbSettingsCode } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa6";

// Define interfaces
interface EducationItem {
    title: string;
    text: string;
    years: string;
    href?: string;
}

interface EducationTranslation {
    title: string;
    text: string;
    years: string;
    href?: string;
}

/**
 * Education section component to display academic background and qualifications
 * @returns {JSX.Element} - Rendered education section
 */
const EducationSection = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("education");

    const iconList: ReactNode[] = [
        <RiSearchEyeLine key="search" />, 
        <BiTask key="task" />, 
        <TbSettingsCode key="code" />, 
        <HiOutlineLightBulb key="idea" />
    ];
    
    const educationList: EducationItem[] = (t('education.education', { returnObjects: true }) as EducationTranslation[])
        .map((value: EducationTranslation) => ({
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
                    <span 
                        className={`${styles.line} bg-component-darker`}
                        data-aos="zoom-in-up" 
                        data-aos-delay="50"
                    ></span>
                    {educationList.map((value, index) => (
                        <div key={index} className={`${styles.educationItem}`}>
                            <div data-aos="zoom-in-left" data-aos-delay="150" className={`${styles.educationBoxCtn}`}>
                                <TextBox
                                    divClassName={styles.educationBox}
                                    title={value.title}
                                    subTitle={value.years}
                                    text={value.text}
                                    href={value.href || ''}
                                />
                            </div>

                            <div 
                                className={`${styles.linePoint} bg-component-darker`}
                                data-aos="zoom-in" 
                                data-aos-delay="150"
                            ></div>
                        </div>
                    ))}
                    <span 
                        className={`${styles.finalPoint} bg-component-darker`}
                        data-aos="zoom-in" 
                        data-aos-delay="150"
                    ></span>
                </div>
            </div>
        </div>
    );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;