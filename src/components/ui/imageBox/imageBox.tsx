import { ReactNode } from 'react';
import styles from './imageBox.module.scss';
import { placeHolderImage } from '@src/assets/images';

type Theme = 'none' | 'dark' | 'light' | string;

interface ImageBoxProps {
    /** Main text content of the image box */
    text?: string;
    /** Title text for the image box */
    title?: string;
    /** Subtitle or secondary text */
    subTitle?: string;
    /** Additional class name for the component */
    divClassName?: string;
    /** Image source URL or import */
    image?: string | null;
    /** Theme variant for the component */
    theme?: Theme;
    /** Optional alt text for the image */
    alt?: string;
}

const ImageBox : React.FC<ImageBoxProps> = ({
    text = 'text',
    title = 'title',
    subTitle = '',
    divClassName = '',
    image = null,
    theme = 'none',
    alt = ''
}) => {
    
    return (
        <div className={`${styles.box} ${divClassName} ${styles[theme]}`}>
            <div className={`${styles.imgPart} bg-component`}>
                <img src={ image || placeHolderImage.src } alt={alt || title} />
            </div>
            <div className={`${styles.nameplate} bg-component-primary`}>
                <p className={`${styles.subTitle} text`}>{subTitle}</p>
                <h3 className={`${styles.title} sub-title`}>{title}</h3>
                <p className={`${styles.text} text`}>{text}</p>
            </div>
        </div>
    );
};

export default ImageBox;