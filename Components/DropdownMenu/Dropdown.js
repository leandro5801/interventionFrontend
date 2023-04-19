
const Dropdown = ({ submenus, dropdown, setDialogOpen,setTableVisible, setDropdown}) => {

  const handleClick = (title) => {
    if (title === "Crear Intervención") {
      console.log("Crear Intervención");
      setDialogOpen(true);
      
    }
    else if (title === "Modificar Intervención") {
      console.log("Modificar Intervención");
    }
    else if (title === "Eliminar Intervención") {
      console.log("Eliminar Intervención");
    }
    else  if (title === "Listar Intervenciones"){
      console.log("Listar Intervenciones");
      setTableVisible(true);
    }
    setDropdown(false);
  };

  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
    {submenus.map((submenu, index) => (
      <li key={index} className="menu-items">
        <a onClick={() => handleClick(submenu.title)}>
          {submenu.title}
        </a>
        
      </li>
    ))}
  </ul>
  );
};

export default Dropdown;
