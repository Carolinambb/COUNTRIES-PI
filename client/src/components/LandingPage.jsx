import React from "react";
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import styles1 from './Button.module.css'

function LandingPage(){
    return (
        <div className={styles.landing}>
            <h1 className={styles.title_landing}>Welcome!</h1>
            <Link to='/home'>
                <div className={styles.center}>

                    <button className={styles1.btn_landing}><span >Ingresar</span></button>
                    
                </div>
            </Link>
        </div>
    )
}

export default LandingPage;