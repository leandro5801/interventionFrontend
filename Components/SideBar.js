import { Disclosure } from "@headlessui/react";
import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import styles from "../styles/Home.module.css";

function SideBar(){
    return <div className={styles.sidebarcontainer}>
        <div className={styles.logo}>
            <h2>Aica</h2>
        </div>
        <div className={styles.wrapper}>
            <ul>
                <li><a href="#">Intervenciones</a></li>
                <li><a href="#">Recomendaciones</a></li>
            </ul>
        </div>

    </div>; 

}

export default SideBar;