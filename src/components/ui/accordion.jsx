import { useState } from 'react';

// css
import styles from './accordion.module.scss';

const Accordion = ({text='text', title = 'title', icon={}, 
                    divClassName='' }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className={`${styles.box} ${divClassName} ${isOpen ? styles.open : ''}`}
            onClick = {() => {setIsOpen(!isOpen)}}>

            <div className={`${styles.overlay} background`}>
                <span className={`${styles.iconCover} title`}>{icon}</span>
                <h3 className='sub-title'>{title}</h3>
                <span className={`${styles.iconPlus} flex inverse-bg`}>
                    {/* Using before and after to make plus */}
                </span>
            </div>
            <div className={`${styles.expandArea} text background`}>
                <p className={`text`}>{text}</p>
            </div>
        </div>
    )
}

export default Accordion;
