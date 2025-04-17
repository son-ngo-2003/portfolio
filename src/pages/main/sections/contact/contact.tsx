import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./contact.module.scss";

//components
import { ContactForm } from ".";
import { ContactContent } from "./contactForm";

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("contact");
    const contactContent = t("contact.contact", { returnObjects: true }) as ContactContent;

    return (
        <div ref={ref} className={`${styles.contact} section`}>
            <div className={`${styles.welcome}`}>
                <h3 
                    className="sub-title" 
                    data-aos="fade-right" 
                    data-aos-delay="50"
                >
                    {t("contact.introduction.sub-title")}
                </h3>
                <h1 
                    className="title maj" 
                    data-aos="fade-right" 
                    data-aos-delay="150"
                >
                    {t("contact.introduction.title")}
                </h1>
                <p 
                    className="text" 
                    data-aos="fade-right" 
                    data-aos-delay="250"
                >
                    {t("contact.introduction.text")}
                </p>
            </div>

            <div className={`${styles.contactForm} row`}>
                <div className="col l-12 m-12 c-12">
                    <ContactForm contactContent={contactContent} />
                </div>    
            </div>
        </div>
    );
});

Contact.displayName = 'Contact';

export default Contact;