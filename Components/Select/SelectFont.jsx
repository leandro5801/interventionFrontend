import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { Fuente } from "../../enums/Fuente.enum";
import { SessionContext } from "../../contexts/session/SessionContext";
export default function SelectFuente() {
  const { changeFont, font } = useContext(SessionContext);
  const handleChange = (event) => {
    console.log("====================================");
    console.log(event.target.value);
    console.log("====================================");
    changeFont(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-filled-label">Fuente</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={font ? font : null}
        onChange={handleChange}
      >
        {Object.keys(Fuente).map((fuente) => {
          return (
            <MenuItem
              key={fuente}
              value={Fuente[fuente]}
              style={{ fontFamily: Fuente[fuente] }}
            >
              {Fuente[fuente]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
