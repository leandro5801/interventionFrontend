import Dropdown from "react-dropdown";
import styles from "../../styles/Home.module.css";
import Select from "react-select";
import { useState } from "react";

const Filter = ({
  mostrarFiltrado,
  consultores,
  selectedConsultor,
  setSelectedConsultor,
  process,
  selectedProcess,
  setSelectedProcess,
  interventions,
}) => {
  const [processT, setProcessT] = useState("");
  const [consultorT, setConsultorT] = useState("");

  const consultoresOptions =
    consultores &&
    consultores.map((item) => ({
      value: item.name,
      label: item.name,
    }));

  const processOptions =
    process &&
    process.map((item) => ({
      value: item.label,
      label: item.label,
    }));

  //Para que se llene un arreglo con lo seleccionado en el otro
  const [options1Filtered, setOptions1Filtered] = useState(consultoresOptions);
  const [options2Filtered, setOptions2Filtered] = useState(processOptions);

  const handleSelect1Change = (selectedOption) => {
    const filteredData = interventions.filter(
      (item) => item.consultor === selectedOption.value
    );
    const filteredOptions = processOptions.filter((option) =>
      filteredData.some((item) => item.process === option.value)
    );
    setOptions2Filtered(filteredOptions);
    setOptions1Filtered(consultoresOptions);
    setConsultorT({ label: selectedOption.value, value: selectedOption.value });
    setSelectedConsultor(selectedOption.value);
  };

  const handleSelect2Change = (selectedOption) => {
    const filteredData = interventions.filter(
      (item) => item.process === selectedOption.value
    );
    const filteredOptions = consultoresOptions.filter((option) =>
      filteredData.some((item) => item.consultor === option.value)
    );
    setOptions1Filtered(filteredOptions);
    setOptions2Filtered(processOptions);
    setProcessT({ label: selectedOption.value, value: selectedOption.value });
    setSelectedProcess(selectedOption.value);
  };

  const handleConsultorChange = (option) => {
    setConsultorT({ label: option.value, value: option.value });
    setSelectedConsultor(option.value);
  };
  const handleProcessChange = (option) => {
    setProcessT({ label: option.value, value: option.value });
    setSelectedProcess(option.value);
  };
  return (
    <>
      {mostrarFiltrado && (
        <>
          <div className={styles.timeRangeContainer}>
            <div className={styles.timeRange}>
              <Select
                className={styles.selectReact}
                value={consultorT}
                onChange={handleSelect1Change}
                options={options1Filtered}
                placeholder="Consultor..."
              />
              <Select
                className={styles.selectReact}
                value={processT}
                onChange={handleSelect2Change}
                options={options2Filtered}
                placeholder="Proceso..."
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Filter;
