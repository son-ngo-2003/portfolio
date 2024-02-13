import { useState } from 'react';

import styles from './buttonElement.module.scss';

const ButtonElement = ({ listAssets = [], debutIndex=0,
                  onClick= () => {}, divClassName='' }) => {
    const length = listAssets.length;
    const [selectedIndex, setSelectedIndex] = useState(debutIndex);

    const handleOnClick = (event) => {
        const newIndex = (selectedIndex+1)%length
        setSelectedIndex( newIndex );
        onClick( newIndex, event );
    }

    return (
        <div className={`${styles.button} ${divClassName}`}
                onClick = {handleOnClick}>
            <div className={`${styles.overlay} bg-component flex`}>
                { listAssets[selectedIndex].type === "icon"
                    ? <i className='text'>{ listAssets[selectedIndex].value }</i>
                    : <img src={ listAssets[selectedIndex].value } alt=""/>
                }
            </div>
        </div>
    )
}

export default ButtonElement;
