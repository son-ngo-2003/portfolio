import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

// services
import { getBlogByName, getBlogById } from '/src/services/blogServices'

//css
import styles from "./blog.module.scss"

const BlogAdmin = () => {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ blogContent, setBlogContent ] = useState({});

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
                    return <p className={`${styles.paragraph} text`} key={index}>{item.value}</p>;
                case 'image':
                    return <img src={item.value} alt={`Image ${index}`} key={index} />;
                case 'imageDescription':
                    return <p className={`${styles.imageDescription} text`} key={index}>{item.value}</p>;
                case 'link':
                    return <a className={`${styles.link} text`} href={item.value} key={index}>{item.value}</a>;
                default:
                    return null;
            }
        });
    };

    useEffect(() => {
        (async () => {
            console.log(searchParams.get("type"), searchParams.get("id"))
            const blog = searchParams.get("type") === 'blog' 
                        ? await getBlogByName(searchParams.get("name") ) 
                        : await getBlogById(searchParams.get("id") );
            setBlogContent(blog);
        })();
    }, []);

    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}>
                <p className={`${styles.date} sub-title`}>Writen on: {blogContent && blogContent.writenDate}</p>
                {blogContent && renderContent(blogContent.content_en)}
            </div>
        </div>
    )
}

    export default BlogAdmin
