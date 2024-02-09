import styles from './button.module.scss';

const Button = ({text='text', size='medium', icon={}, 
                onClick= () => {}, divClassName='' }) => {
    return (
        <button className={`${styles.button} ${size} ${divClassName} flex`}
                onClick = {onClick}>
            <div className="flex">
                <p className='text'>{text}</p>
                <span className={`${styles.icon}`}>{icon}</span>
            </div>
        </button>
    )
}

export default Button;
