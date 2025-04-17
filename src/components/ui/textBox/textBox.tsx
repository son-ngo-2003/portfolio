import { ReactNode } from 'react';
import styles from './textBox.module.scss';

interface TextBoxProps {
    /** Main text content of the text box */
    text?: string;
    /** Title text for the text box */
    title?: string;
    /** Subtitle or secondary text */
    subTitle?: string;
    /** Additional class name for the component */
    divClassName?: string;
    /** URL that the text box links to */
    href?: string;
    /** Whether to open the link in a new tab */
    newTab?: boolean;
    /** Optional onClick handler */
    onClick?: () => void;
}

const TextBox : React.FC<TextBoxProps> = ({
    text = 'text',
    title = 'title',
    subTitle = '',
    divClassName = '',
    href = '',
    newTab = true,
    onClick
})=> {
    
    const targetProp = newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
    
    return (
        <a 
            className={`${styles.box} ${divClassName}`} 
            href={href}
            onClick={onClick}
            {...targetProp}
        >
            <div className={`${styles.overlay} bg-component-darker`}>
                <div className={`${styles.header}`}>
                    <h3 className={`${styles.title} sub-title`}>{title}</h3>
                    <p className={`${styles.subTitle} text`}>{subTitle}</p>
                </div>
                <p className={`${styles.text} text`}>{text}</p>
            </div>
            <div className={`${styles.triangle} bg-component-darker`}></div>
        </a>
    );
};

export default TextBox;