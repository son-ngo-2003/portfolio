import { useState, ReactNode, useRef, useEffect } from 'react';
import styles from './expandableBox.module.scss';
import { useWindowDimensions } from '@src/hooks';

interface ExpandableBoxProps {
    /** The main content text of the box */
    text?: string;
    /** The title displayed at the top of the box */
    title?: string;
    /** Icon element to display */
    icon?: ReactNode;
    /** Additional class name for the component */
    divClassName?: string;
}

const ExpandableBox : React.FC<ExpandableBoxProps> = ({
    text = 'text',
    title = 'title',
    icon,
    divClassName = '',
}) => {
    const { width, height } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const textRef = useRef<HTMLParagraphElement>(null);
    
    // Calculate content height when component mounts or text changes
    useEffect(() => {
        if (textRef.current) {
            setContentHeight(textRef.current.scrollHeight + 20); // Add padding
        }
    }, [textRef?.current?.scrollHeight, width]);

    const handleToggle = (): void => {
        if (width >= 1200) return;
        setIsOpen(!isOpen);
    };

    const handleClose = (e: React.MouseEvent): void => {
        if (width >= 1200) return;
        e.stopPropagation();
        setIsOpen(false);
    };
    
    return (
        <div 
            className={`${styles.box} ${divClassName} bg-component ${isOpen ? styles.open : ''}`}
            onClick={handleToggle}
        >
            <div className={`${styles.boxInside}`}>
                <div className={`${styles.headerContainer} bg-component`}>
                    <span className={`${styles.iconCover} title`}>{icon}</span>
                    <h3 className='sub-title'>{title}</h3>
                </div>

                <div 
                    className={`${styles.expandArea} bg-component`}
                    style={ { height: `${contentHeight}px` }}
                >
                    <p className={`text`} ref={textRef}>{text}</p>
                </div>
                {/* ::after for decoration line */}

                {isOpen && (
                    <div 
                        className={`${styles.backOverlay}`}
                        onClick={handleClose}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default ExpandableBox;