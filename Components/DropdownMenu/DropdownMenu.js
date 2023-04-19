import { useState } from 'react';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleMenu}>Menú</button>
      {isOpen && (
        <ul>
          <li>
            <button onClick={() => console.log('Crear tarea')}>Crear tarea</button>
          </li>
          <li>
            <button onClick={() => console.log('Modificar tarea')}>Modificar tarea</button>
          </li>
          <li>
            <button onClick={() => console.log('Eliminar tarea')}>Eliminar tarea</button>
          </li>
          <li>
            <button onClick={() => console.log('Listar tareas')}>Listar tareas</button>
          </li>
        </ul>
      )}
    </div>
  );
}