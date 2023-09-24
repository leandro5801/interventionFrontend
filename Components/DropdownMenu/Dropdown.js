
import { useState, useEffect } from "react";

const Dropdown = ({
  items,
  dropdown,
  setDialogCreInteOpen,
  setTableVisible,
  setDropdown,
  setDialogRecomendationOpen,

}) => {

  const handleClick = (title) => {
    if (title === "Crear Intervención") {
      setDialogCreInteOpen(true);
    } else if (title === "Listar Intervenciones") {
      setTableVisible(true);
    } else if (title === "Crear Recomendación") {
      setDialogRecomendationOpen(true);
    }

    setDropdown(false);
  };

  return (
    
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {items.submenu.map((submenu, index) => (
        <li key={index} className="menu-items">
          <a onClick={() => handleClick(submenu.title)}>{submenu.title}</a>
        </li>
      ))}

    </ul>
  );
};

export default Dropdown;
