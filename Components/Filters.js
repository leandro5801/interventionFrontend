import Dropdown from "react-dropdown";
import data from "../public/structure.json";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import { useState } from "react";

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
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUebSelect = (option) => {
    setShowDropdown(true);
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
      <div className={styles.wrapper}>
        <ul>
          {uebOptions.map((option) => (
            <li key={option.value} value={selectedUeb}>
              <a onClick={() => handleUebSelect(option)}>{option.value}</a>
              {showDropdown && selectedUeb === option.value && (
                <ul>
                  {selectedUeb && (
                    <Dropdown
                      className={styles.selectFilter}
                      options={structureOptions}
                      onChange={handleStructureSelect}
                      value={selectedStructure}
                      placeholder="Departamento o Dirección"
                    />
                  )}
                  {selectedStructure && (
                    <Dropdown
                      className={styles.selectFilter}
                      options={areaOptions}
                      onChange={handleAreaSelect}
                      value={selectedArea}
                      placeholder="Área"
                    />
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filters;
