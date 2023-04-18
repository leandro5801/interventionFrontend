import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import Filter from "../Components/Filter";

import { client } from "../utils/fetchWrapper";

import DropdownMenu from "../Components/DropdownMenu";

function SideBar() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

    //para cargar del json
    const [ueb, setUeb] = useState(null);
    const [structure, setStructure] = useState(null);
    const [area, setArea] = useState(null);
  
    useEffect(() => {
      client("structure.json").then(
        (structure) => {
          setUeb(structure?.ueb);
          setStructure(structure?.structure);
          setArea(structure?.area);
        },
        (error) => {
          console.error("Error: ", error);
        }
      );
    }, []);

  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <h2>Aica</h2>
      </div>

      <div className={styles.wrapper}>
        <Filter 
        ueb={ueb}
        structure={structure}
        area={area}
          />
        {/* <ul>
          <li>
            <a href="#">Intervenciones</a>
          </li>
          <li>
            <a href="#">Recomendaciones</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export default SideBar;
