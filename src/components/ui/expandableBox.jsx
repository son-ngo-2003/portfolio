import styles from './expandableBox.module.scss';

const ExpandableBox = ({text='text', title = 'title', icon={}, 
                        divClassName='' }) => {
    return (
        <div className={`${styles.box} ${divClassName} bg-component`}>
            <div className={`${styles.overlay}`}>
                <span className={`${styles.iconCover} title`}>{icon}</span>
                <h3 className='sub-title'>{title}</h3>
            </div>
            
            <div className={`${styles.expandArea} bg-component`}>
                <p className={`text`}>{text}</p>
            </div>
            {/* ::after for decoration line */}
        </div>
    )
}

export default ExpandableBox;
