import { useState } from 'react';

//utils
import { boldTextFormat } from '@src/utils/blogUtils';

// css
import styles from './accordion.module.scss';

interface AccordionProps {
    text: string;
    title: string;
    icon: React.ReactNode;
    divClassName?: string;

    isOpen?: boolean;
    onClick?: () => void;
}

const Accordion : React.FC<AccordionProps> = ({
    text, 
    title, 
    icon,                
    divClassName='',
    isOpen=false,
    onClick
}) => {
    return (
        <button 
            className={`${styles.box} ${divClassName} ${isOpen ? styles.open : ''}`}
            onClick={onClick}>

            <div className={`${styles.overlay} background`}>
                <div className={`${styles.iconCover} title`}>{icon}</div>
                <h3 className='sub-title'>{title}</h3>
                <span className={`${styles.iconPlus} flex inverse-bg`}>
                    {/* Using before and after to make plus */}
                </span>
            </div>
            <div className={`${styles.expandArea} text background`}>
                <p className="text">{boldTextFormat(text)}</p>
            </div>
        </button>
    );
};

export default Accordion;
