import React from 'react'; // Importa React
import { Cliente } from '../types'; // Importa la interfaz Cliente

// Define las propiedades que recibirá el componente
interface ClienteTableProps {
  clientes: Cliente[]; // Lista de clientes a mostrar
  onEdit: (Cliente: Cliente) => void; // Función para editar un cliente
  onDelete: (id: number) => void; // Función para eliminar un cliente
}

const ClienteTable: React.FC<ClienteTableProps> = ({ clientes, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Direccion</th>
          <th>Telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            {/* Muestra cada campo del cliente en una celda de la tabla */}
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.email}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.telefono}</td>
            <td>
              {/* Botón para editar el cliente, llama a la función 'onEdit' con los datos del cliente */}
              <button onClick={() => onEdit(cliente)}>Editar</button>

              {/* Botón para eliminar el cliente, llama a la función 'onDelete' con el 'id' del cliente */}
              <button onClick={() => onDelete(cliente.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClienteTable; // Exporta el componente para su uso en otros archivos
