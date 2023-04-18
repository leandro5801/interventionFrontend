import React, { useState } from "react";
import Select from "react-select";
import Dropdown from "react-dropdown";
import styles from "../styles/Home.module.css";

const options = [
  { value: "apple", label: "Apple", type: "fruit" },
  { value: "banana", label: "Banana", type: "fruit" },
  { value: "orange", label: "Orange", type: "fruit" },
  { value: "grape", label: "Grape", type: "fruit" },
  { value: "carrot", label: "Carrot", type: "vegetable" },
  { value: "broccoli", label: "Broccoli", type: "vegetable" },
  { value: "lettuce", label: "Lettuce", type: "vegetable" },
];

const Filter = ({ ueb, structure, area }) => {
  const [filteredOptions, setFilteredOptions] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);

  const handleTypeChange = (selectedOption) => {
    console.log(filteredOptions);
    setSelectedType(selectedOption);
    if (selectedOption) {
      const filtered = area.filter((area) => area.ueb === selectedOption.value);
      setFilteredOptions(filtered);
      setSelectedValue(null);
      setShowSecondDropdown(true);
    } else {
      setFilteredOptions(ueb);
      setSelectedValue(null);
      setShowSecondDropdown(false);
    }
  };

  const handleValueChange = (selectedOption) => {
    console.log(filteredOptions);
    setSelectedValue(selectedOption);
    if (selectedOption) {
      const filtered = filteredOptions.filter(
        (area) => area.structure === selectedOption.value
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(
        area.filter((area) => area.structure === selectedType.value)
      );
    }
  };
  return (
    <div>
     <div>
      <Dropdown
        options={
          ueb &&
          ueb.map((sup) => ({
            label: sup.ueb,
            value: sup.ueb,
          }))
        }
        onChange={handleTypeChange}
        value={selectedType}
        placeholder="Selecione UEB"
      />
      </div>
      <div>
      {showSecondDropdown && (
        <Dropdown
          className={styles}
          options={filteredOptions}
          onChange={handleValueChange}
          value={selectedValue}
          placeholder="Select a value"
        />
      )}
      </div>
    </div>
  );
};

export default Filter;
