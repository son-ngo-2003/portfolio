// css
import styles from './imageBox.module.scss';

const textBox = ({text='text', title = 'title', subTitle='', 
                    divClassName='', image=null, theme='none' }) => {
    
    return (
        <div className={`${styles.box} ${divClassName} ${styles[theme]}`}>
            <div className={`${styles.imgPart} bg-component`}>
                {image 
                ? <img src={image}></img>
                : ''}
            </div>
            <div className={`${styles.nameplate} bg-component-primary`}>
                <p className={`${styles.subTitle} text`}>{subTitle}</p>
                <h3 className={`${styles.title}   sub-title`}>{title}</h3>
                <p className={`${styles.text}     text`}>{text}</p>
            </div>

        </div>
    )
}

export default textBox;
