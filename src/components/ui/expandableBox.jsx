import styles from './expandableBox.module.scss';

const ExpandableBox = ({text='text', title = 'title', icon={}, 
                        divClassName='' }) => {
    return (
        <div className={`${styles.box} ${divClassName} scroll`}>
            <div className={`${styles.overlay}`}>
                <span className={`${styles.iconCover} title`}>{icon}</span>
                <h3 className='sub-title'>{title}</h3>
            </div>
            {/* ::after for decoration line */}
            <div className={`${styles.expandArea}`}>
                <p className={`text`}>{text}</p>
            </div>
        </div>
    )
}

export default ExpandableBox;
