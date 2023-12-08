import { drawerClasses } from "@mui/material";

// SelectStyles.js
export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 3
  }),
  
  control: (base) => ({
    ...base,
    height: "5px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    // color: "gray", // Custom colour
  }),
  dropdown: (base) => ({
    ...base,
    
    
  }),
  menuList: (data) => ({
   maxHeight: "80px",
   overflow: 'auto'
  }),
  option: () => ({
    padding: '8px',
    background: 'white'
  }) 
  //   valueContainer: (base) => ({
  //   ...base,
  //   maxHeight: "30px",
  //   overflow: 'auto',
  // }),

};
