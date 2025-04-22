import { forwardRef, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./services.module.scss";

//components
import { Accordion } from "@src/components";

//icons
import { FaCode } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";

// Define interfaces
interface ServiceItem {
    id: number;
    title: string;
    text: string;
    icon: ReactNode;
}

interface ServiceTranslation {
    title: string;
    text: string;
}

const ServicesSection = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("services");
    const [ openAccordion, setOpenAccordion ] = useState<number | null>(null);

    const iconList: ReactNode[] = [
        <FiGlobe key="globe" />, 
        <MdOutlinePhoneIphone key="mobile" />, 
        <FaChartSimple key="chart" />, 
        <FaCode key="code" />
    ];
    
    const servicesList: ServiceItem[] = (t('services.services', { returnObjects: true }) as ServiceTranslation[])
        .map((value, key) => ({
            id: key,
            title: value.title,
            text: value.text,
            icon: iconList[key] || <FaQuestion key="default" />
        }));

    return (
        <div ref={ref} className={`${styles.services} section row`}>
            <div className={`${styles.welcome} col l-6 m-12 c-12`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("services.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("services.introduction.title")}</h1>
                
                <p 
                    className={`${styles.introductionText} text`} 
                    data-aos="fade-right" 
                    data-aos-delay="250"
                >
                    {t("services.introduction.text")}
                </p>
            </div>

            <div className={`${styles.listContainer} col l-6 m-12 c-12`}>
                <div className={`${styles.servicesList}`}>
                    {servicesList.map((value, index) => (
                        <div 
                            key={index} 
                            className="flex"
                            data-aos="fade-up" 
                            data-aos-delay={250 + index * 100}
                        >
                            <Accordion
                                isOpen={openAccordion === value.id}
                                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}

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

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;