//css
import styles from "./notfound.module.scss"

//images
import { notfoundImage } from "/src/assets/images";

const NotFoundPage = () => {
    return (
        <div className = {`${styles.overlay} row`}>
            <img src={notfoundImage.src} alt="" />
        </div>
    )
}

    export default NotFoundPage
