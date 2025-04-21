import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
	size?: 'small' | 'medium' | 'large';
	color?: string;
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
	size = 'medium', 
	color = 'primary',
	className = '' 
}) => {
	return (
		<div className={`${styles.spinnerContainer} ${styles[size]} ${styles[color]} ${className}`}>
			<div className={styles.spinner}>
				<div className={styles.bounce1}></div>
				<div className={styles.bounce2}></div>
				<div className={styles.bounce3}></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;