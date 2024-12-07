import React from 'react'; // Importa React
import { Medico } from '../typesmedico'; // Importa la interfaz Medico

// Define las propiedades que recibirá el componente
interface MedicoTableProps {
  medicos: Medico[]; // Lista de médicos a mostrar
  onEdit: (medico: Medico) => void; // Función para editar un médico
  onDelete: (id: number) => void; // Función para eliminar un médico
}

const MedicoTable: React.FC<MedicoTableProps> = ({ medicos, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Especialidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map((medico) => (
          <tr key={medico.id}>
            {/* Muestra cada campo del médico en una celda de la tabla */}
            <td>{medico.nombre}</td>
            <td>{medico.apellido}</td>
            <td>{medico.email}</td>
            <td>{medico.telefono}</td>
            <td>{medico.especialidad}</td>
            <td>
              {/* Botón para editar el médico, llama a la función 'onEdit' con los datos del médico */}
              <button onClick={() => onEdit(medico)}>Editar</button>

              {/* Botón para eliminar el médico, llama a la función 'onDelete' con el 'id' del médico */}
              <button onClick={() => onDelete(medico.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicoTable; // Exporta el componente para su uso en otros archivos