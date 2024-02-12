// css
import styles from './textBox.module.scss';

const textBox = ({text='text', title = 'title', subTitle='', 
                    divClassName='' }) => {
    
    return (
        <div className={`${styles.box} ${divClassName}`}>
            <div className={`${styles.overlay} bg-component-darker`}>
                <div className={`${styles.header}`}>
                    <h3 className={`${styles.title} sub-title`}>{title}</h3>
                    <p className={`${styles.subTitle} text`}>{subTitle}</p>
                </div>
                <p className={`${styles.text} text`}>{text}</p>

                <div className={`${styles.triangle} border-as-component-darker`}></div>
            </div>

        </div>
    )
}

export default textBox;
