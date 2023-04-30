import Dropdown from "react-dropdown";
import data from "../public/structure.json";

const uebOptions = data.ueb.map((item) => ({
  value: item.ueb,
  label: item.ueb,
}));

const Filters = ({
  selectedUeb,
  setSelectedUeb,
  selectedStructure,
  setSelectedStructure,
  selectedArea,
  setSelectedArea,
}) => {
  const handleUebSelect = (option) => {
    setSelectedUeb(option.value);
    setSelectedStructure(null);
    setSelectedArea(null);
  };

  const handleStructureSelect = (option) => {
    setSelectedStructure(option.value);
    setSelectedArea(null);
  };

  const handleAreaSelect = (option) => {
    setSelectedArea(option.value);
  };

  const structureOptions = data.structure
    .filter((item) => item.ueb === selectedUeb)
    .map((item) => ({
      value: item.structure,
      label: item.structure,
    }));

  const areaOptions = data.area
    .filter(
      (item) => item.ueb === selectedUeb && item.structure === selectedStructure
    )
    .map((item) => ({
      value: item.area,
      label: item.area,
    }));

  return (
    <>
      <Dropdown
        menuClassName="custom-menu"
        options={uebOptions}
        onChange={handleUebSelect}
        value={selectedUeb}
        placeholder="Seleccione una UEB"
      />
      {selectedUeb && (
        <Dropdown
          options={structureOptions}
          onChange={handleStructureSelect}
          value={selectedStructure}
          placeholder="Seleccione departamento o dirección"
        />
      )}
      {selectedStructure && (
        <Dropdown
          options={areaOptions}
          onChange={handleAreaSelect}
          value={selectedArea}
          placeholder="Seleccione un área"
        />
      )}
    </>
  );
};

export default Filters;
