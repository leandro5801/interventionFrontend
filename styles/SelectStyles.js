import { drawerClasses } from "@mui/material";

// SelectStyles.js
export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#ccc",
    height: "10px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "gray", // Custom colour
  }),
  dropdown: (base) => ({
    ...base,
  }),
  menuList: (data) => ({
    maxHeight: "60px",
    overflow: "auto",
  }),
  //   valueContainer: (base) => ({
  //   ...base,
  //   maxHeight: "30px",
  //   overflow: 'auto',
  // }),
  components: {
    MultiValueContainer: ({ children, innerProps }) => (
      <div style={{ display: "flex" }} {...innerProps}>
        {children}
      </div>
    ),
  },
};
