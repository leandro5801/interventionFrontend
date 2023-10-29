import { drawerClasses } from "@mui/material";

// SelectStyles.js
export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#ccc",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "gray", // Custom colour
  }),
  dropdown: (base) => ({
    ...base,
   
  }),
  menuList: (data) => ({
   maxHeight: "100px",
   overflow: 'auto',
  }),
};
