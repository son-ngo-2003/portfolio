import React from 'react';
import { useState, useEffect } from 'react';

import styles from './buttonElement.module.scss';

export interface ButtonElementAsset {
	type: "icon" | "image";
	value: React.ReactNode | string;
}

interface ButtonElementProps {
    listAssets: Array<ButtonElementAsset>;
    setIndex?: number;
    onClick?: (index: number, event: React.MouseEvent) => void;
    divClassName?: string;
}

const ButtonElement : React.FC<ButtonElementProps> = ({ 
    listAssets = [], 
    setIndex=0,
    onClick= () => {}, 
    divClassName='' 
}) => {
    const length = listAssets.length;
    const [selectedIndex, setSelectedIndex] = useState( 0  );

    const handleOnClick = (event: React.MouseEvent) => {
        const newIndex = (selectedIndex+1)%length
        setSelectedIndex( newIndex );
        onClick( newIndex, event );
    }

    useEffect(() => {
        setSelectedIndex( setIndex === -1 ? 0 : setIndex );
    },[setIndex])

    return (
        <div className={`${styles.button} ${divClassName}`}
                onClick = {handleOnClick}>
            <div className={`${styles.overlay} bg-component flex`}>
                { (listAssets[selectedIndex].type === "icon"
                    ? <i className='text'>{ listAssets[selectedIndex].value }</i>
                    : <img src={ listAssets[selectedIndex].value as string } alt=""/>)
                }
            </div>
        </div>
    )
}

export default ButtonElement;
