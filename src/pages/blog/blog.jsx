import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

// services
import { getBlogById } from '/src/services/blogServices'

//utils
import { boldTextFormat } from '../../utils/blogUtils';

//css
import styles from "./blog.module.scss"

const BlogPage = () => {
    const languages = ["en", "fr", "vn"];
    const [t, i18n] = useTranslation("blog");
    const [ isContentSet, setContentSet ] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams()
    

    const renderContent = (blogContent = []) => {

        return blogContent.map((item, index) => {
            let element = null;
            switch (item.type) {
                case 'preTitle':
                    element = <h2 className={`${styles.preTitle} title`} key={index}>{item.value}</h2>;
                    break;
                case 'title':
                    element =  <h1 className={`${styles.title} title`} key={index}>{item.value}</h1>;
                    break;
                case 'subtitle':
                    element =  <h2 className={`${styles.subTitle} sub-title`} key={index}>{item.value}</h2>;
                    break;
                case 'heading':
                    element =  <h3 className={`${styles.heading} sub-title`} key={index}>{item.value}</h3>;
                    break;
                case 'subheading':
                    element =  <h3 className={`${styles.subheading} sub-title`} key={index}>{item.value}</h3>;
                    break;
                case 'paragraph':
                    element =  <p className={`${styles.paragraph} text`} key={index}>{boldTextFormat(item.value)}</p>;
                    break;
                case 'image':
                    element =  <img src={item.value} alt={`Image ${index}`} key={index} />;
                    break;
                case 'imageDescription':
                    element =  <p className={`${styles.imageDescription} text`} key={index}>{item.value}</p>;
                    break;
                case 'link':
                    element =  <a className={`${styles.link} text`} href={item.value} key={index} target='_blank'>{item.value}</a>;
                    break;
                case 'list':
                    element =  <p className={`${styles.list} text`} href={item.value} key={index} target='_blank'>{item.value}</p>;
                    break;
                default:
                    return null;    
            }

            element = React.cloneElement(element, {
                "data-aos": "fade-right",
                "data-aos-delay": `${index * 100}`,
                "data-aos-anchor" : "blog-written-date",
            });
            return element;

        });
    };

    useEffect(() => {
        (async () => {
            const blog = await getBlogById( searchParams.get("id") );

            if (!blog.length) return;
            
            const blogTranslation = {
                en: {...blog, content: blog.content_en},
                fr: {...blog, content: blog.content_fr},
                vn: {...blog, content: blog.content_vn}
            } 
            languages.forEach( (language) => {
                i18next.addResourceBundle( language, "blog", blogTranslation[language], true, true ); 
            } )
            setContentSet(true);
        })();
    }, []);



    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}>
                {isContentSet 
                    ?   <>
                            <p className={`${styles.date} sub-title blog-written-date`}>Writen on: {t("writenDate")}</p>
                            {renderContent(t("content", {returnObjects: true}))}
                        </>
                    : <h2 className={`${styles.notfound} title`}>{t("blog.notFound")}</h2>}
            </div>
        </div>
    )
}

    export default BlogPage