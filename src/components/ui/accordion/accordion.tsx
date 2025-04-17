import { useState } from 'react';

//utils
import { boldTextFormat } from '@src/utils/blogUtils.js';

// css
import styles from './accordion.module.scss';

interface AccordionProps {
    text: string;
    title: string;
    icon: React.ReactNode;
    divClassName?: string;
}

const Accordion : React.FC<AccordionProps> = ({
    text, 
    title, 
    icon,                
    divClassName='',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.box} ${divClassName} ${isOpen ? styles.open : ''}`}
            onClick={() => { setIsOpen(!isOpen) }}>

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
        </div>
    );
};

export default Accordion;
