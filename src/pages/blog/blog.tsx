import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getBlogById } from '@src/services/blogServices';
import styles from "./blog.module.scss";
import { Language } from '@src/types/languages';
import { Blog } from '@src/types/blog';
import MDEditor from '@uiw/react-md-editor';
import { LoadingSpinner } from '@src/components'; // Assuming you have this component

const BlogPage: React.FC = () => {
    const { t, i18n } = useTranslation("blog");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                
                const blogId = searchParams.get("id");
                if (!blogId) {
                    navigate("/#projects");
                    return;
                }

                const fetchedBlog = await getBlogById(blogId);
                if (!fetchedBlog) {
                    setError(t("blogNotFound")); // TODO: add error handling for translation
                    return;
                }
                
                setBlog(fetchedBlog);
            } catch (err) {
                setError(t("errorLoading")); // TODO: add error handling for translation
                console.error("Error fetching blog:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [searchParams, navigate, t, i18n.language]);

    const currentLanguage = i18n.language as Language;
    const blogContent = blog?.content[currentLanguage];

    if (isLoading) {
        return (
            <div className={`row section ${styles.loadingContainer}`}>
                <LoadingSpinner />
                <h2>{t("loading")}</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`row section ${styles.errorContainer}`}>
                <h1>{error}</h1>
                <button onClick={() => navigate("/#projects")} className={styles.backButton}>
                    {t("backToProjects")}
                </button>
            </div>
        );
    }

    return (
        <div className={`row section`}>
            <div className={`${styles.container} col l-12 m-12 c-12`}>
                {blogContent ? (
                    <MDEditor.Markdown 
                        source={blogContent} 
                        className={styles.markdown}    
                    />
                ) : (
                    <div className={styles.notfound}>
                        <h1>{t("contentNotAvailable")}</h1> {/* TODO: add error handling for translation */}
                        <p>{t("contentNotAvailableMessage")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;