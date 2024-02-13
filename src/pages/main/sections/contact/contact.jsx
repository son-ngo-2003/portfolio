import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./contact.module.scss"

//components
import { ContactForm } from "./"

const Contact = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("contact");
    const contactContent = t("contact.contact", {returnObjects: true});

    return (
        <div ref={ref} className={`${styles.contact} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title">{t("contact.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("contact.introduction.title")}</h1>
                <p className="text">{t("contact.introduction.text")}</p>
            </div>

            <div className={`${styles.contactForm} row`}>
                <div className="col l-12">
                    <ContactForm
                        contactContent={contactContent}
                    ></ContactForm>
                </div>    
            </div>

        </div>
    )
})

export default Contact
