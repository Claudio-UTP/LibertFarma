import React from 'react'; // Importa React
import { Medicamento } from '../typesmedicamento'; // Importa la interfaz Medicamento

// Define las propiedades que recibirá el componente
interface MedicamentoTableProps {
  medicamentos: Medicamento[]; // Lista de medicamemtos a mostrar
  onEdit: (Medicamento: Medicamento) => void; // Función para editar un medicamento
  onDelete: (id: number) => void; // Función para eliminar un medicamento
}

const MedicamentoTable: React.FC<MedicamentoTableProps> = ({ medicamentos, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Receta</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {medicamentos.map((medicamento) => (
          <tr key={medicamento.id}>
            {/* Muestra cada campo del medicamento en una celda de la tabla */}
            <td>{medicamento.nombre}</td>
            <td>{medicamento.descripcion}</td>
            <td>{medicamento.receta}</td>
            <td>{medicamento.tipo}</td>
            <td>{medicamento.cantidad}</td>
            <td>{medicamento.precio}</td>
            <td>
              {/* Botón para editar el medicamento, llama a la función 'onEdit' con los datos del medicamento */}
              <button onClick={() => onEdit(medicamento)}>Editar</button>

              {/* Botón para eliminar el medicamento, llama a la función 'onDelete' con el 'id' del medicamento */}
              <button onClick={() => onDelete(medicamento.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicamentoTable; // Exporta el componente para su uso en otros archivos