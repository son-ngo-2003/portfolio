import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

// css
import styles from "./activities.module.scss"

//components
import { Button } from "/src/components"

const Activities = forwardRef(( props, ref ) => {
    const [t, i18n] = useTranslation("activities");

    return (
        <div ref={ref} className={`${styles.activities} section`}>
            <div className={`welcome`}>
                <h3 className="sub-title">{t("activities.introduction.sub-title")}</h3>
                <h1 className="title maj">{t("activities.introduction.title")}</h1>
                <p className={`text`}>{t("activities.introduction.text")}</p>
            </div>

            <div className={`${styles.buttons} row`}>
                <a className="col l-6">
                    <Button
                        text={t("activities.activities.associations")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a className="col l-6">
                    <Button
                        text={t("activities.activities.sports")}
                        size='large'
                        divClassName={styles.btnInside}
                    />
                </a>

                <a className="col l-6">
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
