import { useState } from 'react';

import styles from './expandableBox.module.scss';

const ExpandableBox = ({text='text', title = 'title', icon={}, 
                        divClassName='' }) => {
    const [isOpen_Mobile, setIsOpen_Mobile] = useState(false);

    return (
        <div className={`${styles.box} ${divClassName} bg-component ${isOpen_Mobile ? styles.open : ''}`}
                onClick = {() => {setIsOpen_Mobile(!isOpen_Mobile)}}>
            <div className={`${styles.overlay}`}>
                <span className={`${styles.iconCover} title`}>{icon}</span>
                <h3 className='sub-title'>{title}</h3>
            </div>
            
            <div className={`${styles.expandArea} bg-component`}>
                <p className={`text`}>{text}</p>
            </div>
            {/* ::after for decoration line */}

            <div className={`${styles.backOverlay}`}
                onClick = {() => {setIsOpen_Mobile(false)}}></div>
        </div>
    )
}

export default ExpandableBox;
