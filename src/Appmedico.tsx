import React,{ useEffect,useState } from 'react';
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Medico } from './typesmedico'; // Importa la interfaz Medico
import MedicoForm from './componentsMedico/MedicoForm';
import MedicoTable from './componentsMedico/MedicoTable';
import './Appmedico.css'; 
 // Importa el componente de tabla

 const App: React.FC = () => {
    // Estado para almacenar la lista de médicos
    const [medicos, setMedicos] = useState<Medico[]>([]);
    
    // Estado para almacenar el médico que se está editando (si aplica)
    const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);
  
    // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de médicos
    useEffect(() => {
      obtenerMedicos();
    }, []);
  
    // Función para obtener la lista de médicos desde el backend
    const obtenerMedicos = async () => {
      try {
        const respuesta = await axios.get('/api/medicos'); // Cambié la ruta a '/api/medicos'
        setMedicos(respuesta.data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error al obtener médicos:', error); // Muestra un error en la consola si falla la solicitud
      }
    };
  
    // Función para manejar la creación de un nuevo médico
    const manejarCrear = async (medico: Omit<Medico, 'id'>) => {
      try {
        await axios.post('/api/medicos', medico); // Hace una solicitud POST para crear un nuevo médico
        obtenerMedicos(); // Actualiza la lista de médicos después de la creación
      } catch (error) {
        console.error('Error al crear médico:', error); // Muestra un error en la consola si falla la solicitud
      }
    };
  
    // Función para manejar la actualización de un médico existente
    const manejarActualizar = async (medico: Omit<Medico, 'id'>) => {
      if (!medicoEdit) return; // Si no hay médico en edición, no hace nada
      try {
        await axios.put(`/api/medicos/${medicoEdit.id}`, medico); // Hace una solicitud PUT para actualizar el médico
        obtenerMedicos(); // Actualiza la lista de médicos después de la actualización
        setMedicoEdit(null); // Resetea el estado de edición
      } catch (error) {
        console.error('Error al actualizar médico:', error); // Muestra un error en la consola si falla la solicitud
      }
    };
  
    // Función para manejar la eliminación de un médico
    const manejarEliminar = async (id: number) => {
      try {
        await axios.delete(`/api/medicos/${id}`); // Hace una solicitud DELETE para eliminar el médico
        obtenerMedicos(); // Actualiza la lista de médicos después de la eliminación
      } catch (error) {
        console.error('Error al eliminar médico:', error); // Muestra un error en la consola si falla la solicitud
      }
    };
  
    // Función para iniciar la edición de un médico, pasando sus datos al formulario
    const iniciarEdicion = (medico: Medico) => {
      setMedicoEdit(medico); // Establece el médico a editar
    };
  
    // Función para cancelar la edición, reseteando el estado de edición
    const cancelarEdicion = () => {
      setMedicoEdit(null); // Resetea el médico en edición
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Crud de Médicos</h1>
        
        {/* Componente de Formulario para crear o editar médicos */}
        <MedicoForm
          onSubmit={medicoEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
          initialData={medicoEdit || undefined} // Pasa los datos iniciales si se está editando
          onCancel={medicoEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
        />
  
        {/* Componente de Tabla para mostrar la lista de médicos */}
        <MedicoTable
          medicos={medicos} // Pasa la lista de médicos al componente de tabla
          onEdit={iniciarEdicion} // Pasa la función para editar un médico
          onDelete={manejarEliminar} // Pasa la función para eliminar un médico
        />
      </div>
    );
  };
  
  export default App;