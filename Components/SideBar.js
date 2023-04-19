import styles from "../styles/Home.module.css";

import Filters from "./Filters";

function SideBar({
  selectedUeb,
  setSelectedUeb,
  selectedStructure,
  setSelectedStructure,
  selectedArea,
  setSelectedArea,
}) {
  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <h2>Aica</h2>
      </div>

      <div className={styles.wrapper}>
        <Filters
          selectedUeb={selectedUeb}
          setSelectedUeb={setSelectedUeb}
          selectedStructure={selectedStructure}
          setSelectedStructure={setSelectedStructure}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
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
