import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";

const Navbar = ({
  setDialogCreInteOpen,
  setTableVisible,
  setDialogRecomendationOpen,
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
              setDialogRecomendationOpen={setDialogRecomendationOpen}
              setTableVisible={setTableVisible}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
