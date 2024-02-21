import { useEffect, useState } from 'react';
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
            switch (item.type) {
                case 'preTitle':
                    return <h2 className={`${styles.preTitle} title`} key={index}>{item.value}</h2>;
                case 'title':
                    return <h1 className={`${styles.title} title`} key={index}>{item.value}</h1>;
                case 'subtitle':
                    return <h2 className={`${styles.subTitle} sub-title`} key={index}>{item.value}</h2>;
                case 'heading':
                    return <h3 className={`${styles.heading} sub-title`} key={index}>{item.value}</h3>;
                case 'subheading':
                    return <h3 className={`${styles.subheading} sub-title`} key={index}>{item.value}</h3>;
                case 'paragraph':
                    return <p className={`${styles.paragraph} text`} key={index}>{boldTextFormat(item.value)}</p>;
                case 'image':
                    return <img src={item.value} alt={`Image ${index}`} key={index} />;
                case 'imageDescription':
                    return <p className={`${styles.imageDescription} text`} key={index}>{item.value}</p>;
                case 'link':
                    return <a className={`${styles.link} text`} href={item.value} key={index} target='_blank'>{item.value}</a>;
                case 'list':
                    return <p className={`${styles.list} text`} href={item.value} key={index} target='_blank'>{item.value}</p>;
                default:
                    return null;    
            }

        });
    };

    useEffect(() => {
        (async () => {
            const blog = await getBlogById( searchParams.get("id") );
            
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
                <p className={`${styles.date} sub-title`}>Writen on: {t("writenDate")}</p>
                {isContentSet && renderContent(t("content", {returnObjects: true}))}
            </div>
        </div>
    )
}

    export default BlogPage
