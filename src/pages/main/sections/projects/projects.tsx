import { forwardRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./projects.module.scss";

//components
import { ImageBox } from "@src/components";

//context
import { ThemeContext } from "@src/contexts/themeContext";

//services
import { getBlogsByType } from '@src/services/blogServices';
import { ProjectBlog } from "@src/types/blog";

/**
 * Projects section component to display portfolio projects
 * @returns {JSX.Element} - Rendered projects section
 */
const Projects = forwardRef<HTMLDivElement>((props, ref) => {
    const [projects, setProjects] = useState<ProjectBlog[]>([]);
    const { t } = useTranslation("projects");
    const { theme } = useContext(ThemeContext);
    const tagName = t('projects.projects', { returnObjects: true }) as any;

    useEffect(() => {
        (async () => {
            const projectsList = await getBlogsByType('project') as ProjectBlog[];
            if (projectsList) {
                setProjects(projectsList);
            }
        })();
    }, []);

    return (
        <div ref={ref} className={`${styles.projects} section ${projects[0] ? '' : styles.notRendered}`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title" data-aos="fade-right" data-aos-delay="50">{t("projects.introduction.sub-title")}</h3>
                <h1 className="title maj" data-aos="fade-right" data-aos-delay="150">{t("projects.introduction.title")}</h1>
            </div>

            <div className={`${styles.projectsList} row`}>
                {projects && projects.map((project, index) => (
                    <a 
                        key={index} 
                        className={`${styles.projectItem} col l-6 m-12 c-12 flex`}
                        href={`/blog?id=${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="zoom-out-up" 
                        data-aos-delay={100 + index * 100}
                    >
                        <ImageBox
                            subTitle={`${tagName.date}: ${project.startDate.toDateString() + (project.endDate ? ` - ${project.endDate.toDateString()}` : 'current')}`}
                            title={`${project.title}`}
                            text={`${tagName.role}: ${project.role}`}
                            image={`${project.image}`}
                            theme={theme}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
});

Projects.displayName = 'Projects';

export default Projects;