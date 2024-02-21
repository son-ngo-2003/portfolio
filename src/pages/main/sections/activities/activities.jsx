import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./activities.module.scss"

//components
import { Button } from "/src/components"

//services
import { getBlogsByType } from '/src/services/blogServices'

const Activities = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("activities");
    const [assoBlog, setAssoBlog] = useState({});
    const [sportBlog, setSportBlog] = useState({});
    const [artBlog, setArtBlog] = useState({});

    useEffect(() => {
        const setBlog = async (type, set) => {
            const blogs = await getBlogsByType(type);
            set(blogs[0]);
        };

        setBlog('associations', setAssoBlog);
        setBlog('sports', setSportBlog);
        setBlog('arts', setArtBlog);

    }, []);

    return (
        <div ref={ref} className={`${styles.activities} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title">{t("activities.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("activities.introduction.title")}</h1>
                <p className={`text`}>{t("activities.introduction.text")}</p>
            </div>

            <div className={`${styles.buttons} row`}>
                <a href={`/blog?id=${assoBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank">
                    <Button
                        text={t("activities.activities.associations")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${sportBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank">
                    <Button
                        text={t("activities.activities.sports")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${artBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank">
                    <Button
                        text={t("activities.activities.arts")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>
            </div>
        </div>
    )
})

export default Activities
