import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./activities.module.scss";

//components
import { Button } from "@src/components";

//services
import { getBlogsByType } from '@src/services/blogServices';
import { BlogType } from "@src/types/blog";
import { useWindowDimensions } from "@src/hooks";

const Activities = forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useTranslation("activities");
    const [assoBlogId, setAssoBlogId] = useState<string>();
    const [sportBlogId, setSportBlogId] = useState<string>();
    const [artBlogId, setArtBlogId] = useState<string>();
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const setBlog = async (type: BlogType, set: (id: string) => void) => {
            const blogs = await getBlogsByType(type);
            if (blogs && blogs.length > 0) {
                set(blogs[0].id);
            }
        };

        setBlog(BlogType.Association, setAssoBlogId);
        setBlog(BlogType.Sport, setSportBlogId);
        setBlog(BlogType.Art, setArtBlogId);

    }, []);

    return (
        <div ref={ref} className={`${styles.activities} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("activities.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("activities.introduction.title")}</h1>
                <p className={`text`} data-aos="fade-right" data-aos-delay="250">{t("activities.introduction.text")}</p>
            </div>

            <div className={`${styles.buttons} row`}>
                <a href={`/blog?id=${assoBlogId}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="150">
                    <Button
                        text={t("activities.activities.associations")}
                        size={width > 425 ? 'large' : 'flexible'}
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${sportBlogId}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="250">
                    <Button
                        text={t("activities.activities.sports")}
                        size={width > 425 ? 'large' : 'flexible'}
                        divClassName={styles.btnInside}
                    />
                </a>

                <a href={`/blog?id=${artBlogId}`} className="col l-6 m-12 c-12 flex" target="_blank" rel="noopener noreferrer"
                    data-aos="zoom-in-right" data-aos-delay="350">
                    <Button
                        text={t("activities.activities.arts")}
                        size={width > 425 ? 'large' : 'flexible'}
                        divClassName={styles.btnInside}
                    />
                </a>
            </div>
        </div>
    );
});

Activities.displayName = 'Activities';

export default Activities;