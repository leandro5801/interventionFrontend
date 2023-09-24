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
              setTableVisible={setTableVisible}
              setDialogRecomendationOpen={setDialogRecomendationOpen}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
