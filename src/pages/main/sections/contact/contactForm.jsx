import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

//services
import {getInfo} from '/src/services/infoServices'

//css
import styles from './contactForm.module.scss';

//components
import { Form, Button } from "/src/components"

//icons
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { LuTwitter } from "react-icons/lu";

//emailjs
import { emailjsConfig } from "/src/config/emailjs.js"

const ContactForm = ({ divClassName='', contactContent }) => {
    const formRef = useRef(null);
    const [infoContact, setInfoContact] = useState({});
    const info = contactContent.info;
    const form = contactContent.form;
    const listInput = {
        name:           {type: 'text', placeholder: form.name, required: true},
        email:          {type: 'email', placeholder: form.email, required: true}, 
        subject:        {type: 'text', placeholder: form.subject, required: true}, 
        message:    {type: 'textarea', placeholder: form.message, required: true},
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await getInfo();
                setInfoContact(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        })();
    }, []);

    const separateStringIntoParagraphs = (str) => {
        const paragraphs = str.split(', ');
        return paragraphs.map((paragraph, index) => (
            <p className={`${styles.detail} text`} key={index}>{paragraph}</p>
        ));
    };

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(emailjsConfig.service_id, emailjsConfig.template_id, formRef.current, emailjsConfig.options)
        emailjs
            .sendForm(emailjsConfig.service_id, emailjsConfig.template_id, formRef.current, emailjsConfig.options)
            .then(() => { alert( `Email sent successfully! Thanks for your attention! We will reply to you as soon as possible.`)},
                 (error) => { alert('Email was not able to send! The error text: ', error.text, "\nPlease try again or send an email directly to me. Thank you!")});
    }

    return (
        <div className={`${styles.overlay} ${divClassName} bg-component`}>

            <div className={`${styles.formContact}`}>
                <h3 className={`${styles.title} sub-title`}>SEND ME A MESSAGE</h3>
                <Form
                    callback={sendEmail}
                    ref = {formRef}
                    listInput = {listInput}
                    submitButton = { (<Button
                                        divClassName={styles.btnInside}
                                        size="medium"
                                        text={form.button}
                                        isUsedSubmit={true}
                                    ></Button>)}
                ></Form>
            </div>

            <div className={`${styles.info} bg-component-primary`}>
                <div className={`${styles.mainDetails}`}>
                    <h3 className={`${styles.title} sub-title`}>{info.title}</h3>

                    <p className={`${styles.subTitle} text`}>{info.email}</p>
                    <p className={`${styles.detail} text`}>{infoContact.email || "error"}</p>

                    <p className={`${styles.subTitle} text`}>{info.phone}</p>
                    <p className={`${styles.detail} text`}>{infoContact.telephone || "error"}</p>

                    <p className={`${styles.subTitle} text`}>{info.address}</p>
                    {infoContact.address ? separateStringIntoParagraphs(infoContact.address) : "error"}
                </div>

                <span className={`${styles.divLine}`}></span>
                <div className={`${styles.socialMedia} text`}>
                    <a href={infoContact.linkedin} className=""><AiOutlineLinkedin /></a>
                    <a href={infoContact.facebook} className=""><AiOutlineFacebook /></a>
                    <a href={infoContact.twitter} className=""><LuTwitter /></a>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;
