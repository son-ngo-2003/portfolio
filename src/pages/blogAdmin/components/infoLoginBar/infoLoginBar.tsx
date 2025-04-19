import { useNavigate } from 'react-router-dom';
import { signOut, User } from "firebase/auth";
import { auth } from '@src/config/firebase';
import { MouseEvent as ReactMouseEvent } from 'react';

//css
import styles from './infoLoginBar.module.scss';

//components
import { Button } from "@src/components"

interface InfoLoginBarProps {
    divClassName?: string;
    user?: User | null;
}

const InfoLoginBar : React.FC<InfoLoginBarProps> = ({ 
    divClassName = '', 
    user = null 
}) => {
    const handleSignOut = async (e: ReactMouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await signOut(auth);
            window.location.href = '/admin'
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`${divClassName} bg-component ${styles.signInContainer}`}>
            <h2 className='text'>{ user
            ? `Welcome ${user.email}!`
            : `You are currently in simulation mode!`
            }</h2>

            <Button
                divClassName={styles.btnInside}
                text="Logout"
                size="small"
                fill
                onClick = {handleSignOut}
            />
        </div>
    )
}

export default InfoLoginBar;
