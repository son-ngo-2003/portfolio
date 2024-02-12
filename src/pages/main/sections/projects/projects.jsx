import { forwardRef, useContext } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./projects.module.scss"

//components
import { ImageBox } from "/src/components"

//context
import {ThemeContext} from "/src/contexts/themeContext"

const Projects = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("projects");
    const {theme} = useContext(ThemeContext);

    const projectsList = t('projects.projects', {returnObjects: true})
                            .map( ( value, key ) => ({
                                title: value.title,
                                role: value.role,
                                date: value.date,
                                image: "",
                            }));

    return (
        <div ref={ref} className={`${styles.projects} section`}>
            <div className={`welcome`}>
                <h3 className="sub-title">{t("projects.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("projects.introduction.title")}</h1>
            </div>

            <div className={`${styles.projectsList} row`}>
                {  projectsList.map( (value, index) => (
                        <div key={index} className={`${styles.projectItem} col l-6`}>
                            <ImageBox
                                subTitle = {value.date}
                                title = {value.title}
                                text = {value.role}
                                image = {value.image}
                                theme = {theme}
                            />
                        </div>
                    ))
                }
            </div>


        </div>
    )
})

export default Projects
