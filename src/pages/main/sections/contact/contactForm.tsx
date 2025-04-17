import { useState, useEffect, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

//services
import { getInfo } from '@src/services/infoServices';

//css
import styles from './contactForm.module.scss';

//components
import { Form, Button, type InputField } from "@src/components";

//icons
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

//emailjs
import { emailjsConfig } from "@src/config/emailjs";

export interface ContactContent {
    info: {
        title: string;
        email: string;
        phone: string;
        address: string;
    };
    form: {
        title: string;
        name: string;
        email: string;
        subject: string;
        message: string;
        button: string;
    };
}

interface ContactInfo {
    email?: string;
    telephoneNum?: string;
    telephoneFormat?: string;
    mapURL?: string;
    address?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    [key: string]: any;
}

interface ContactFormProps {
    /** Additional class name for the component */
    divClassName?: string;
    /** Contact form content and translations */
    contactContent: ContactContent;
}


const ContactForm : React.FC<ContactFormProps> = ({ 
    divClassName = '', 
    contactContent 
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [infoContact, setInfoContact] = useState<ContactInfo>({});
    const info = contactContent.info;
    const form = contactContent.form;
    const listInput : Record<string, InputField> = {
        name:       { type: 'text', label: form.name, required: true },
        email:      { type: 'email', label: form.email, required: true }, 
        subject:    { type: 'text', label: form.subject, required: true }, 
        message:    { type: 'textarea', label: form.message, required: true },
    };

    useEffect(() => {
        (async () => {
            try {
                const data = await getInfo();
                setInfoContact(data);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        })();
    }, []);

    const separateStringIntoParagraphs = (str: string): JSX.Element[] => {
        const paragraphs = str.split(', ');
        return paragraphs.map((paragraph, index) => (
            <p className={``} key={index}>{paragraph}</p>
        ));
    };

    const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        if (!formRef.current) return;
        
        emailjs
            .sendForm(
                emailjsConfig.service_id, 
                emailjsConfig.template_id, 
                formRef.current, 
                emailjsConfig.options
            )
            .then(
                () => { 
                    alert(`Email sent successfully! Thanks for your attention! We will reply to you as soon as possible.`);
                },
                (error) => { 
                    alert(`Email was not able to send! The error text: ${error.text}\nPlease try again or send an email directly to me. Thank you!`);
                }
            );
    };

    return (
        <div 
            className={`${styles.overlay} ${divClassName} bg-component contact-form-container`}
            data-aos="fade-right"  
            data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
        >
            <div className={`${styles.formContact}`}>
                <h3 
                    className={`${styles.title} sub-title`}
                    data-aos="fade-right" 
                    data-aos-delay="250"
                >
                    {form.title}
                </h3>

                <div 
                    data-aos="fade-right" 
                    data-aos-delay="350"  
                    data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`}
                >
                    <Form
                        onSubmit={sendEmail}
                        ref={formRef}
                        listInput={listInput}
                        submitButton={(
                            <Button
                                divClassName={styles.btnInside}
                                size="medium"
                                text={form.button}
                                isUsedSubmit={true}
                            />
                        )}
                    />
                </div>
            </div>

            <div 
                className={`${styles.info} bg-component-primary`}
                data-aos="zoom-in" 
                data-aos-delay="150"
                data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
            >
                <div className={`${styles.mainDetails}`}>
                    <h3 
                        className={`${styles.title} sub-title`}
                        data-aos="fade-up" 
                        data-aos-delay="400"   
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {info.title}
                    </h3>

                    <p 
                        className={`${styles.subTitle} text`}
                        data-aos="fade-up" 
                        data-aos-delay="500"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {info.email}
                    </p>

                    <a 
                        className={`${styles.detail} text`}
                        href={`mailto:${infoContact?.email}`}
                        data-aos="fade-up" 
                        data-aos-delay="550"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {infoContact.email || "error"}
                    </a>

                    <p 
                        className={`${styles.subTitle} text`}
                        data-aos="fade-up" 
                        data-aos-delay="600"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {info.phone}
                    </p>

                    <a 
                        className={`${styles.detail} text`}
                        href={`tel:+33${infoContact?.telephoneNum}`}
                        data-aos="fade-up" 
                        data-aos-delay="650"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {infoContact.telephoneFormat || "error"}
                    </a>

                    <p 
                        className={`${styles.subTitle} text`}
                        data-aos="fade-up" 
                        data-aos-delay="700"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {info.address}
                    </p>

                    <a 
                        href={`${infoContact.mapURL}`} 
                        className={`text ${styles.detail}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="fade-up" 
                        data-aos-delay="750"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        {infoContact.address ? separateStringIntoParagraphs(infoContact.address) : "error"}
                    </a>
                </div>

                <span 
                    className={`${styles.divLine}`}
                    data-aos="zoom-in" 
                    data-aos-delay="550"
                    data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                />

                <div className={`${styles.socialMedia} text`}>
                    <a 
                        href={infoContact.linkedin} 
                        className="" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="zoom-in" 
                        data-aos-delay="700"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        <AiOutlineLinkedin />
                    </a>

                    <a 
                        href={infoContact.facebook} 
                        className="" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="zoom-in" 
                        data-aos-delay="800"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        <AiOutlineFacebook />
                    </a>

                    <a 
                        href={infoContact.instagram} 
                        className="" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="zoom-in" 
                        data-aos-delay="900"  
                        data-aos-anchor={`.contact-form-container${divClassName ? '.' + divClassName : ''}`} 
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;