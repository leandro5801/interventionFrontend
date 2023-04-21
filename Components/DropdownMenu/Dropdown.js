const Dropdown = ({
  submenus,
  dropdown,
  setDialogCreInteOpen,
  setDialogRecomendationOpen,
  setTableVisible,
  setDropdown,
}) => {
  const handleClick = (title) => {
    if (title === "Crear Intervención") {
      setDialogCreInteOpen(true);
    } else if (title === "Crear Recomendación") {
      setDialogRecomendationOpen(true);
    } else if (title === "Listar Intervenciones") {
      setTableVisible(true);
    }
    setDropdown(false);
  };

  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <a onClick={() => handleClick(submenu.title)}>{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
