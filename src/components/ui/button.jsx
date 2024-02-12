import styles from './button.module.scss';

const Button = ({text='text', size='medium', icon=false, 
                onClick= () => {}, divClassName='' }) => {
    return (
        <button className={`${styles.button} ${styles[size]} ${divClassName}`}
                onClick = {onClick}>
            <div className={`${styles.overlay} bg-component ${icon? styles.withIcon : styles.noIcon}`}>
                <p className='text'>{text}</p>
                <span className={`${styles.icon} text`}>{icon || ''}</span>
            </div>
        </button>
    )
}

export default Button;
