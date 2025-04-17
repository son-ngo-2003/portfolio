import { useState, ReactNode } from 'react';
import styles from './expandableBox.module.scss';

interface ExpandableBoxProps {
    /** The main content text of the box */
    text?: string;
    /** The title displayed at the top of the box */
    title?: string;
    /** Icon element to display */
    icon?: ReactNode;
    /** Additional class name for the component */
    divClassName?: string;
    /** Optional custom onClick handler */
    onClick?: () => void;
    /** Optional initial state of the box */
    initialOpen?: boolean;
}

const ExpandableBox : React.FC<ExpandableBoxProps> = ({
    text = 'text',
    title = 'title',
    icon,
    divClassName = '',
    onClick,
    initialOpen = false
}) => {
    const [isOpen_Mobile, setIsOpen_Mobile] = useState<boolean>(initialOpen);

    const handleToggle = (): void => {
        setIsOpen_Mobile(!isOpen_Mobile);
        onClick?.();
    };

    const handleClose = (e: React.MouseEvent): void => {
        e.stopPropagation();
        setIsOpen_Mobile(false);
    };

    return (
        <div 
            className={`${styles.box} ${divClassName} bg-component ${isOpen_Mobile ? styles.open : ''}`}
            onClick={handleToggle}
        >
            <div className={`${styles.overlay}`}>
                <span className={`${styles.iconCover} title`}>{icon}</span>
                <h3 className='sub-title'>{title}</h3>
            </div>
            
            <div className={`${styles.expandArea} bg-component`}>
                <p className={`text`}>{text}</p>
            </div>
            {/* ::after for decoration line */}

            <div 
                className={`${styles.backOverlay}`}
                onClick={handleClose}
            ></div>
        </div>
    );
};

export default ExpandableBox;