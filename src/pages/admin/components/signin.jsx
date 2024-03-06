import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '/src/config/firebase';

//css
import styles from './signin.module.scss';

//components
import { Form, Button } from "/src/components"

const SignInBox = ({ divClassName='' }) => {
    const [isError, setIsError] = useState(false);

    const description = 'Attention! This admin page is only for admin of the son-ngo portfolio website. However, if you are not admin, you still can see the simulation of the blog admin page by clicking the button "Simulation Blog Admin" below.';

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/admin/blog'
        } catch (error) {
            setIsError(true);
        }
    }

    return (
        <div className={`${divClassName} bg-component ${styles.signInContainer}`}>
            <div className={`${styles.welcome}`}> 
                <h3 className="sub-title">Welcome to</h3>
                <h1 className="title">Admin Page</h1>
                <p className="text">{description}</p>
                {isError && 
                    <p className={`${styles.errorText} text`}>Email or Password is not correct!</p>}
            </div>

            <Form
                listInput = {
                    {
                        email: {type: 'email', placeholder: 'Email', required: true}, 
                        password:    {type: 'password', placeholder: 'Password', required: true}, 
                    }}

                submitButton = { (<Button
                                    divClassName={styles.btnSignin}
                                    size="medium"
                                    text="Login"
                                    fill
                                    isUsedSubmit={true}/>)
                                }
                divClassName={styles.formSignin}

                onSubmit = {handleSignIn}
            />

            <Button
                divClassName={styles.btnSimulation}
                text="Simulation Blog Admin"
                size="medium"
                fill
                onClick = {() => window.location.href = '/admin/blog'}
            />
        </div>
    )
}

export default SignInBox;
