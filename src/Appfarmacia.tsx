import React,{ useEffect,useState } from 'react';
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Farmacia } from './typesfarmacia'; // Importa la interfaz Farmacia
import FarmaciaForm from './componentsFarmacia/FarmaciaForm';
import FarmaciaTable from './componentsFarmacia/FarmaciaTable';
import './Appfarmacia.css'; 
 // Importa el componente de tabla

const Appfarmacia: React.FC = () => {
  // Estado para almacenar la lista de farmacia
  const [farmacias, setFarmacia] = useState<Farmacia[]>([]);
  
  // Estado para almacenar el cliente que se está editando (si aplica)
  const [FarmaciaEdit, setFarmaciaEdit] = useState<Farmacia | null>(null);

  // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de farmacias
  useEffect(() => {
    obtenerFarmacias();
  }, []);

  // Función para obtener la lista de farmacias desde el backend
  const obtenerFarmacias = async () => {
    try {
      const respuesta = await axios.get('/api/farmacias'); // Hace una solicitud GET a '/api/farmacias'
      setFarmacia(respuesta.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener farmacia:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la creación de un nuevo farmacia
  const manejarCrear = async (farmacia: Omit<Farmacia, 'id'>) => {
    try {
      await axios.post('/api/farmacias',farmacia); // Hace una solicitud POST para crear un nuevo farmacia
      obtenerFarmacias(); // Actualiza la lista de farmacias después de la creación
    } catch (error) {
      console.error('Error al crear farmacia:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la actualización de un farmacia existente
  const manejarActualizar = async (farmacia: Omit<Farmacia, 'id'>) => {
    if (!FarmaciaEdit) return; // Si no hay farmacia en edición, no hace nada
    try {
      await axios.put(`/api/farmacias/${FarmaciaEdit.id}`,farmacia); // Hace una solicitud PUT para actualizar el farmacia
      obtenerFarmacias(); // Actualiza la lista de farmacias después de la actualización
      setFarmaciaEdit(null); // Resetea el estado de edición
    } catch (error) {
      console.error('Error al actualizar farmacia:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la eliminación de un farmacia
  const manejarEliminar = async (id: number) => {
    try {
      await axios.delete(`/api/farmacias/${id}`); // Hace una solicitud DELETE para eliminar el farmacia
      obtenerFarmacias(); // Actualiza la lista de farmacia después de la eliminación
    } catch (error) {
      console.error('Error al eliminar farmacia:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para iniciar la edición de un farmacia, pasando sus datos al formulario
  const iniciarEdicion = (farmacia: Farmacia) => {
    setFarmaciaEdit(farmacia); // Establece el farmacia a editar
  };

  // Función para cancelar la edición, reseteando el estado de edición
  const cancelarEdicion = () => {
    setFarmaciaEdit(null); // Resetea el farmacia en edición
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crud de Farmacias</h1>
      {/* Componente de Formulario para crear o editar farmacias */}
      <FarmaciaForm
        onSubmit={FarmaciaEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={FarmaciaEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={FarmaciaEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />

      {/* Componente de Tabla para mostrar la lista de farmacias */}
      <FarmaciaTable
        farmacias={farmacias} // Pasa la lista de farmacias al componente de tabla
        onEdit={iniciarEdicion} // Pasa la función para editar un medicamento
        onDelete={manejarEliminar} // Pasa la función para eliminar un medicamento
      />
    </div>
  );
};

export default Appfarmacia; // Exporta el componente  para su uso en otros archivos