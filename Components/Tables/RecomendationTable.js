import styles from "../../styles/Home.module.css"
function RecomendationTable({
  tableRData,
  setTableRData,
  setEditRIdx,
  tableVisible,
  setTableVisible,
  recomendations,
  setRecomendations
}) {
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newRecomendation = tableRData.filter((recomendacion) => recomendacion.id !== idNum);
    
    setTableRData(newRecomendation);
    const newRecomendations =recomendations.filter((recomendacion) => recomendacion.id !== idNum);
    setRecomendations(newRecomendations);
    // update state (if data on backend - make API request to update data)
  }
  return (
    <>
      {tableVisible && <h2>Recomendaciones</h2> && (
        <table className={styles.table}>
          <thead>
            {tableRData.length === 0 || (
              <tr>
                <th className={styles.spacing}>Recomendación</th>
                <th className={styles.spacing}>Descripción</th>
                <th className={styles.spacing}>Consultor</th>
                <th className={styles.spacing}>Tipo</th>
                <th className={styles.spacing}>Seguimiento</th>
              </tr>
            )}
          </thead>
          <tbody>
            {tableRData &&
              tableRData.map((recomendation, i) => (
                <tr key={recomendation.id} className={styles.trStyle}>
                  <td className={styles.tdStyle}>{recomendation.name}</td>
                  <td className={styles.tdStyle}>
                    {recomendation.description}
                  </td>
                  <td className={styles.tdStyle}>{recomendation.consultor}</td>
                  <td className={styles.tdStyle}>
                    {recomendation.classification}
                  </td>
                  <td className={styles.tdStyle}>{recomendation.follow}</td>
                  <td className={styles.tdStyle}>
                    <>
                      <button onClick={() => setEditRIdx(i)}>Edit</button>
                    </>
                  </td>
                  <td className={styles.tdStyle}>
                    <button
                      className={styles.btnTask}
                      type="button"
                      data-task-id={recomendation?.id}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default RecomendationTable;
