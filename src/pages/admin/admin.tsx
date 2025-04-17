import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from '@src/config/firebase'

//components
import { SignInBox } from './components'

//css
import styles from "./admin.module.scss"

const AdminPage = () => {
    useEffect(() => {
        auth.onAuthStateChanged(user => user && (window.location.href = '/admin/blog'))
    }, []);

    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}
                data-aos="zoom-in">
                <SignInBox/>
            </div>
        </div>
    )
}

export default AdminPage
