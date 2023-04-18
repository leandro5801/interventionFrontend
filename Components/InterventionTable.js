import styles from "../styles/Home.module.css";

import { client } from "../utils/fetchWrapper";

function InterventionTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        client('datosintervenciones.json').then(
          (data) => {
            setData(data);
          },
          (error) => {
            console.error('Error: ', error);
          }
        );
      }, []);
    return (
        <div className={styles.contenetcontainer}>
          
          {/* Tabla de intervenciones */}
    
          <div className={styles.contentwrapper}>
            <div>
              <h2>Intervenciones</h2>
              <table className={styles.table}>
                <thead>
                  <tr> 
                    <th className={styles.spacing}>Área de proceso</th>
                    <th className={styles.spacing}>Intervención</th>
                    <th className={styles.spacing}>Proceso</th>
                    <th className={styles.spacing}>Consultor</th>
                    <th className={styles.spacing}>Trabajador</th>
                  </tr>
                </thead>
                <tbody>
                    {/* 
                    {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
            </tr>
          ))} */}
                  {/* Aquí puedes agregar las filas de la tabla */}
                 { data.map((d) => (
                    <tr key={d.id}>
                    <td>{d.area}</td>
                    <td>{d.name}</td>
                    <td>{d.process}</td>
                    <td>{d.consultor}</td>
                    <td>{d.worker}</td>
                  </tr>
                  ))}
                  <tr className={styles.trStyle}>
                    <td>area1</td>
                    <td>intervencion1</td>
                    <td>consultor1</td>
                    <td>trabajador1</td>
                  </tr>
                  <tr className={styles.trStyle}>
                    <td>area2</td>
                    <td>intervencion2</td>
                    <td>consultor2</td>
                    <td>trabajador2</td>
                  </tr>
                </tbody>
              </table>
            </div>
    
            {/* Fin de la tabla  */}
          </div>
        </div>
      );
    }
    
    export default InterventionTable;