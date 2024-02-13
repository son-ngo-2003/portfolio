import { useState, useEffect } from 'react';

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

const ContactForm = ({ divClassName='', contactContent }) => {
    const [infoContact, setInfoContact] = useState({});
    const info = contactContent.info;
    const form = contactContent.form;
    const listInput = {
        name:           {type: 'text', placeholder: form.name, required: true},
        email:          {type: 'email', placeholder: form.email, required: true}, 
        subject:        {type: 'text', placeholder: form.subject, required: true}, 
        describtion:    {type: 'textarea', placeholder: form.message, required: true},
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

    return (
        <div className={`${styles.overlay} ${divClassName} bg-component`}>

            <div className={`${styles.formContact}`}>
                <h3 className={`${styles.title} sub-title`}>SEND ME A MESSAGE</h3>
                <Form
                    listInput = {listInput}
                    submitButton = { (<Button
                                        divClassName={styles.btnInside}
                                        size="medium"
                                        text={form.button}
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
