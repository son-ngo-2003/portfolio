import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./activities.module.scss";

//components
import { Button } from "@src/components";

//services
import { getBlogsByType } from '@src/services/blogServices';

// Define type for blog data
interface BlogItem {
    id?: string;
    title?: string;
    content?: string;
    type?: string;
    date?: string;
    [key: string]: any;
}


const Activities = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("activities");
    const [assoBlog, setAssoBlog] = useState<BlogItem>({});
    const [sportBlog, setSportBlog] = useState<BlogItem>({});
    const [artBlog, setArtBlog] = useState<BlogItem>({});

    useEffect(() => {
        const setBlog = async (type: string, set: React.Dispatch<React.SetStateAction<BlogItem>>) => {
            const blogs = await getBlogsByType(type);
            if (blogs && blogs.length > 0) {
                set(blogs[0]);
            }
        };

        setBlog('associations', setAssoBlog);
        setBlog('sports', setSportBlog);
        setBlog('arts', setArtBlog);

    }, []);

    return (
        <div ref={ref} className={`${styles.activities} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("activities.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("activities.introduction.title")}</h1>
                <p className={`text`} data-aos="fade-right" data-aos-delay="250">{t("activities.introduction.text")}</p>
            </div>

            <div className={`${styles.buttons} row`}>
                <a href={`/blog?id=${assoBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="150">
                    <Button
                        text={t("activities.activities.associations")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${sportBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="250">
                    <Button
                        text={t("activities.activities.sports")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${artBlog?.id}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="350">
                    <Button
                        text={t("activities.activities.arts")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>
            </div>
        </div>
    );
});

Activities.displayName = 'Activities';

export default Activities;