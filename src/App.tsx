import React,{ useEffect,useState } from 'react';// Importa React y hooks necesarios
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Cliente } from './types'; // Importa la interfaz Cliente
import ClienteForm from './componentsCliente/ClienteForm';// Importa el componente de formulario
import ClienteTable from './componentsCliente/ClienteTable';// Importa el componente de tabla
import './App.css'; 
 // Importa el componente de tabla

const App: React.FC = () => {
  // Estado para almacenar la lista de cliente
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  // Estado para almacenar el cliente que se está editando (si aplica)
  const [ClienteEdit, setClienteEdit] = useState<Cliente | null>(null);

  // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de cliente
  useEffect(() => {
    obtenerClientes();
  }, []);

  // Función para obtener la lista de clientes desde el backend
  const obtenerClientes = async () => {
    try {
      const respuesta = await axios.get('/api/clientes'); // Hace una solicitud GET a '/api/clientes'
      setClientes(respuesta.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener cliente:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la creación de un nuevo cliente
  const manejarCrear = async (cliente: Omit<Cliente, 'id'>) => {
    try {
      await axios.post('/api/clientes',cliente); // Hace una solicitud POST para crear un nuevo cliente
      obtenerClientes(); // Actualiza la lista de clientes después de la creación
    } catch (error) {
      console.error('Error al crear cliente:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la actualización de un estudiante existente
  const manejarActualizar = async (cliente: Omit<Cliente, 'id'>) => {
    if (!ClienteEdit) return; // Si no hay cliente en edición, no hace nada
    try {
      await axios.put(`/api/clientes/${ClienteEdit.id}`,cliente); // Hace una solicitud PUT para actualizar el cliente
      obtenerClientes(); // Actualiza la lista de clientes después de la actualización
      setClienteEdit(null); // Resetea el estado de edición
    } catch (error) {
      console.error('Error al actualizar cliente:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la eliminación de un cliente
  const manejarEliminar = async (id: number) => {
    try {
      await axios.delete(`/api/clientes/${id}`); // Hace una solicitud DELETE para eliminar el cliente
      obtenerClientes(); // Actualiza la lista de estudiantes después de la eliminación
    } catch (error) {
      console.error('Error al eliminar cliente:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para iniciar la edición de un cliente, pasando sus datos al formulario
  const iniciarEdicion = (cliente: Cliente) => {
    setClienteEdit(cliente); // Establece el cliente a editar
  };

  // Función para cancelar la edición, reseteando el estado de edición
  const cancelarEdicion = () => {
    setClienteEdit(null); // Resetea el cliente en edición
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crud de Cliente</h1>
      
      {/* Componente de Formulario para crear o editar clientes */}
      <ClienteForm
        onSubmit={ClienteEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={ClienteEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={ClienteEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />

      {/* Componente de Tabla para mostrar la lista de clientes */}
      <ClienteTable
        clientes={clientes} // Pasa la lista de clientes al componente de tabla
        onEdit={iniciarEdicion} // Pasa la función para editar un cliente
        onDelete={manejarEliminar} // Pasa la función para eliminar un cliente
      />
    </div>
  );
};

export default App; // Exporta el componente para su uso en otros archivos
