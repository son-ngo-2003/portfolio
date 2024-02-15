import { forwardRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./projects.module.scss"

//components
import { ImageBox } from "/src/components"

//context
import {ThemeContext} from "/src/contexts/themeContext"

//services
import { getAllProjects } from '/src/services/blogServices'

const Projects = forwardRef(( props, ref ) => {
    const [ projects, setProjects ] = useState([]);
    const [t, i18n] = useTranslation("projects");
    const {theme} = useContext(ThemeContext);

    const tagName = t('projects.projects', {returnObjects: true});

    useEffect(() => {
        (async () => {
            const projectsList = await getAllProjects();
            setProjects(projectsList);
        })();
    }, []);

    return (
        <div ref={ref} className={`${styles.projects} section`}>
            <div className={`${styles.welcome}`}>
                <h3 className="sub-title">{t("projects.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("projects.introduction.title")}</h1>
            </div>

            <div className={`${styles.projectsList} row`}>
                {projects && projects.map( (project, index) => (
                        <a key={index} className={`${styles.projectItem} col l-6`}
                            href={`/blog?type=project&id=${project.id}`}>
                            <ImageBox
                                subTitle = {`${tagName.date}: ${project.date}`}
                                title = {`${project.name}`}
                                text = {`${tagName.role}: ${project.role}`}
                                image = {``}
                                theme = {theme}
                            />
                        </a>
                    ))
                }
            </div>


        </div>
    )
})

export default Projects
