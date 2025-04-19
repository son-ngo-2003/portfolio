import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';

export enum ButtonColor {
	PRIMARY = 'primary',
	YELLOW = 'yellow',
	GRAY = 'gray',
	TEAL = 'teal',
	RED = 'red',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Text content of the button */
	text?: string;
	/** Size of the button */
	size?: ButtonSize;
	/** Icon element to display */
	icon?: ReactNode;
	/** Whether to use a filled style */
	fill?: boolean;
	/** Whether the button is used for form submission */
	isUsedSubmit?: boolean;
	/** Additional class name for the button wrapper */
	divClassName?: string;
	/** Whether the button is in a disabled state */
	disabled?: boolean;
	/** Whether to show loading state */
	loading?: boolean;
	/** Color of the button */
	color?: ButtonColor;
}

const Button : React.FC<ButtonProps> = ({
	text = 'text',
	size = 'medium',
	icon = false,
	fill = false,
	isUsedSubmit = false,
	onClick,
	divClassName = '',
	disabled = false,
	loading = false,
	className = '',
	color = ButtonColor.PRIMARY,
	...restProps
}) => {
	return (
		<button
			className={`${styles.button} ${styles[size]} ${divClassName} ${className} ${color}`}
			onClick={onClick}
			type={isUsedSubmit ? 'submit' : 'button'}
			disabled={disabled || loading}
			{...restProps}
		>
			<div className={`${styles.overlay} ${fill ? styles.fill : ''} bg-component ${icon ? styles.withIcon : styles.noIcon}`}>
				{loading ? (
					<span className={styles.loading}>Loading...</span>
				) : (
					<>
						<p className="text">{text}</p>
						{icon && <span className={`${styles.icon} text`}>{icon}</span>}
					</>
				)}
			</div>
		</button>
	);
};

export default Button;