import React from 'react'; // Importa React
import { Farmacia } from '../typesfarmacia'; // Importa la interfaz Farmacia

// Define las propiedades que recibirá el componente
interface FarmaciaTableProps {
  farmacias: Farmacia[]; // Lista de farmacia a mostrar
  onEdit: (Farmacia: Farmacia) => void; // Función para editar una farmacia
  onDelete: (id: number) => void; // Función para eliminar una farmacia
}

const FarmaciaTable: React.FC<FarmaciaTableProps> = ({ farmacias, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Direccion</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Horario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {farmacias.map((farmacia) => (
          <tr key={farmacia.id}>
            {/* Muestra cada campo de la farmacia en una celda de la tabla */}
            <td>{farmacia.id}</td>
            <td>{farmacia.nombre}</td>
            <td>{farmacia.direccion}</td>
            <td>{farmacia.email}</td>
            <td>{farmacia.telefono}</td>
            <td>{farmacia.horario}</td>
            <td>
              {/* Botón para editar la farmacia, llama a la función 'onEdit' con los datos de la farmacia*/}
              <button onClick={() => onEdit(farmacia)}>Editar</button>

              {/* Botón para eliminar la farmacia, llama a la función 'onDelete' con el 'id' de la farmacia */}
              <button onClick={() => onDelete(farmacia.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FarmaciaTable; // Exporta el componente para su uso en otros archivos