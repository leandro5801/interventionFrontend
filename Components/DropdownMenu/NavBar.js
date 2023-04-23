import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";

const Navbar = ({
  setDialogCreInteOpen,
  setTableVisible,
}) => {
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return (
            <MenuItems
              items={menu}
              key={index}
              setDialogCreInteOpen={setDialogCreInteOpen}
              setTableVisible={setTableVisible}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
