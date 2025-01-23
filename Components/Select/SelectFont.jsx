import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextFormatIcon from "@mui/icons-material/TextFormat"; // Importa el icono de fuente
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { Fuente } from "../../enums/Fuente.enum";
import { SessionContext } from "../../contexts/session/SessionContext";
import { Tooltip } from "@mui/material";
export default function SelectFuente() {
  const { changeFont, font, isDark } = useContext(SessionContext);
  const handleChange = (event) => {
    changeFont(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTooltipOpen(false);
  }; // Oculta el Tooltip cuando se abre el Select }; const handleClose = () => { setOpen(false); }; const handleClick = () => { setTooltipOpen(false); // Asegura que el Tooltip se oculta al hacer clic };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setTooltipOpen(false);
  }; // Asegura que el Tooltip se oculta al hacer clic };
  return (
    <Tooltip title="Seleccionar Fuente" open={tooltipOpen}>
      <Select
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onClick={handleClick}
        IconComponent={TextFormatIcon}
        variant="outlined"
        displayEmpty
        sx={{
          border: isDark ? "2px solid black" : "2px solid white",
          //outline: "none",
          backgroundColor: "#007e9e",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          marginY: "1.2em",
          marginX: "0.1em",
          "&:hover": {
            // border: "none", // Elimina el borde en hover
          },
          "&:focus": {
            //border: "none", // Elimina el borde en focus
            // outline: "none", // Elimina el outline por defecto
          },
          "&:before": {
            border: "none",
            outline: "none", // Elimina el borde antes
          },
          "&:after": {
            border: "none",
            // outline: "none", // Elimina el borde después
          },

          "& .MuiSelect-icon": {
            color: isDark ? "black" : "white",
            margin: 0,
            padding: 0, // Elimina el margen del icono
            position: "absolute", // Posiciona el icono
            left: "50%", // Centra horizontalmente
            top: "50%", // Centra verticalmente
            transform: "translate(-50%, -50%)", // Ajusta para centrar
          },
          "& .MuiSelect-select": {
            border: "none",
            color: "transparent", // Oculta el texto del valor seleccionado
            "&:focus": {
              backgroundColor: "#007e9e", // Mantiene el fondo al hacer foco
            },
            /* "&:hover": {
              border: "none", // Elimina el borde en hover
            },
            "&:focus": {
              border: "none", // Elimina el borde en focus
              outline: "none", // Elimina el outline por defecto
            },
            "&:before": {
              border: "none",
              outline: "none", // Elimina el borde antes
            },
            "&:after": {
              border: "none",
              outline: "none", // Elimina el borde después
            }, */
          },
        }}
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
    </Tooltip>
  );
}
