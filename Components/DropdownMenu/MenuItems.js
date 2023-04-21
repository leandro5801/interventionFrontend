import Dropdown from "./Dropdown";
import { useState } from "react";

const MenuItems = ({
  items,
  setDialogCreInteOpen,
  setDialogRecomendationOpen,
  setTableVisible,
}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
            setDropdown={setDropdown}
            setDialogCreInteOpen={setDialogCreInteOpen}
            setDialogRecomendationOpen={setDialogRecomendationOpen}
            setTableVisible={setTableVisible}
          />
        </>
      ) : (
        <a href={items.url}> {items.title} </a>
      )}
    </li>
  );
};

export default MenuItems;