import { forwardRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiError } from "react-icons/bi";

// css
import styles from "./projects.module.scss";

//components
import { ImageBox, LoadingSpinner } from "@src/components";

//context
import { ThemeContext } from "@src/contexts/themeContext";

//services
import { getBlogsByType } from '@src/services/blogServices';
import { BlogType, ProjectBlog } from "@src/types/blog";
import { toLocalString } from "@src/utils/date";
import { Language } from "@src/types/languages";

/**
 * Projects section component to display portfolio projects
 * @returns {JSX.Element} - Rendered projects section
 */
const Projects = forwardRef<HTMLDivElement>((props, ref) => {
    const { t, i18n } = useTranslation("projects");
    const { theme } = useContext(ThemeContext);
    const tagName = t('projects.projects', { returnObjects: true }) as any;

    const [projects, setProjects] = useState<ProjectBlog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const fetchedProjects = await getBlogsByType(BlogType.Project) as ProjectBlog[];
                if (!fetchedProjects) {
                    setError("Loading projects failed.");
                    return;
                }

                setProjects(fetchedProjects);
            } catch (err) {
                setError("Loading projects failed.");
                console.error("Error fetching projects:", err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const renderProjects = () => {
        if (isLoading) {
            return (
                <div className={`l-12 m-12 c-12 ${styles.loadingContainer}`}>
                    <LoadingSpinner />
                    <h2 className="text">{t("projects.fetch.loading")}</h2>
                </div>
            );
        }

        if (error) {
            return (
                <div className={`l-12 m-12 c-12 ${styles.errorContainer}`}>
                    <div className={styles.errorIcon}><BiError /></div>
                    <h2 className="text">{t("projects.fetch.error")}</h2>
                </div>
            );
        }

        if (projects.length === 0) {
            return (
                <div className={`l-12 m-12 c-12 ${styles.errorContainer}`}>
                    <h2 className="text">{t("projects.fetch.no-projects")}</h2>
                </div>
            );
        }

        return projects.map((project, index) => (
            <a 
                key={index} 
                className={`${styles.projectItem} col l-6 m-12 c-12 flex `}
                href={`/blog?id=${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="zoom-out-up" 
                data-aos-delay={100 + index * 100}
            >
                <ImageBox
                    subTitle={`${tagName.date}: ${toLocalString(project.startDate, i18n.language)} - ${toLocalString(project.endDate, i18n.language, t("projects.projects.now"))}`} // TODO: make translation current
                    title={`${project.title[i18n.language as Language]}`}
                    text={`${tagName.role}: ${project.role}`}
                    image={project.image}
                    theme={theme}
                />
            </a>
        ));

    }

    return (
        <div ref={ref} className={`${styles.projects} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("projects.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("projects.introduction.title")}</h1>
            </div>

            <div className={`${styles.projectsList} row`}>
                {renderProjects()}
            </div>
        </div>
    );
});

Projects.displayName = 'Projects';

export default Projects;