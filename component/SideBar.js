import React from "react";
import styles from "../styles/Home.module.css";

function SideBar(){
    return <div className={styles.sidebarcontainer}>
        <div className={styles.logo}>
            <h2>Aica</h2>
        </div>
        <div className={styles.wrapper}>
            <ul>
                <li><a href="#">Estructura</a></li>
                <li><a href="#">Intervenciones</a></li>
                <li><a href="#">Recomendaciones</a></li>
            </ul>
        </div>

    </div>; 

}

export default SideBar;