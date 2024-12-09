import { drawerClasses } from "@mui/material";

// SelectStyles.js
export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 3,
    //backgroundColor: "var(--bg-color-dark)",
    color: "var(--text-color-general)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text-color-general)", // Cambia el color del texto seleccionado
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-color-general)", // Color del placeholder
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? "var(--text-color-indicator-dropdown-focused)"
      : "#909099",
    "&:hover": { color: "var(--text-color-indicator-dropdown)" },
  }),
  control: (base, state) => ({
    ...base,
    height: "5px",
    backgroundColor: "var(--bg-color-option-select)",

    transition: "border-color 0.2s ease, box-shadow 0.2 ease",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    // color: "gray", // Custom colour

    color: state.isFocused
      ? "var(--text-color-indicator-dropdown-focused)"
      : "#909099",
    "&:hover": { color: "var(--text-color-indicator-dropdown)" },
  }),
  dropdown: (base) => ({
    ...base,
  }),
  menuList: (data) => ({
    maxHeight: "80px",
    overflow: "auto",
    backgroundColor: "var(--bg-color-primary)",
    color: "var(--text-color-primary)",
  }),
  option: (provided) => ({
    ...provided,
    padding: "8px",
    backgroundColor: "var(--bg-color-option-select)",
    color: "var(--text-color-general)",
    "&:hover": {
      color: "var(--text-color-hover-select)", // Asegúrate de que el color del texto siga siendo claro
    },
    transition: ".4s ease color",
  }),
  //   valueContainer: (base) => ({
  //   ...base,
  //   maxHeight: "30px",
  //   overflow: 'auto',
  // }),
};
