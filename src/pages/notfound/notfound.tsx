//css
import styles from "./notfound.module.scss";

//images
import { notfoundImage } from "@src/assets/images";

interface NotFoundPageProps {}

const NotFoundPage : React.FC<NotFoundPageProps> = () => {
    return (
        <div className={`${styles.overlay} row`}>
            <img 
                src={notfoundImage.src} 
                alt="Page not found" 
            />
        </div>
    );
};

export default NotFoundPage;