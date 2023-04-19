import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";

const Navbar = ({setDialogOpen,setTableVisible}) => {
    
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} setDialogOpen={setDialogOpen} setTableVisible={setTableVisible}/>;
        })}
        
      </ul>
      
    </nav>
  );
};

export default Navbar;
