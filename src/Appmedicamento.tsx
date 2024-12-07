import React,{ useEffect,useState } from 'react';
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Medicamento } from './typesmedicamento'; // Importa la interfaz Medicamentos
import MedicamentoForm from './componentsMedicamento/MedicamentoForm';
import MedicamentoTable from './componentsMedicamento/MedicamentoTable';
import './Appmedicamento.css'; 
 // Importa el componente de tabla

const App: React.FC = () => {
  // Estado para almacenar la lista de medicamento
  const [medicamento, setMedicamento] = useState<Medicamento[]>([]);
  
  // Estado para almacenar el medicamento que se está editando (si aplica)
  const [medicamentoEdit, setMedicamentoEdit] = useState<Medicamento | null>(null);

  // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de medicamentos
  useEffect(() => {
    obtenerMedicamentos();
  }, []);

  // Función para obtener la lista de medicamentos desde el backend
  const obtenerMedicamentos = async () => {
    try {
      const respuesta = await axios.get('/api/medicamentos'); // Hace una solicitud GET a '/api/medicamentos'
      setMedicamento(respuesta.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener medicamento:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la creación de un nuevo medicamento
  const manejarCrear = async (medicamento: Omit<Medicamento, 'id'>) => {
    try {
      await axios.post('/api/medicamentos',medicamento); // Hace una solicitud POST para crear un nuevo medicamento
      obtenerMedicamentos(); // Actualiza la lista de medicamentos después de la creación
    } catch (error) {
      console.error('Error al crear medicamento:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la actualización de un medicamento existente
  const manejarActualizar = async (medicamento: Omit<Medicamento, 'id'>) => {
    if (!medicamentoEdit) return; // Si no hay medicamento en edición, no hace nada
    try {
      await axios.put(`/api/medicamentos/${medicamentoEdit.id}`,medicamento); // Hace una solicitud PUT para actualizar el medicamento
      obtenerMedicamentos(); // Actualiza la lista de medicamentos después de la actualización
      setMedicamentoEdit(null); // Resetea el estado de edición
    } catch (error) {
      console.error('Error al actualizar medicamento:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la eliminación de un medicamento
  const manejarEliminar = async (id: number) => {
    try {
      await axios.delete(`/api/medicamentos/${id}`); // Hace una solicitud DELETE para eliminar el medicamento
      obtenerMedicamentos(); // Actualiza la lista de medicamento después de la eliminación
    } catch (error) {
      console.error('Error al eliminar medicamento:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para iniciar la edición de un medicamento, pasando sus datos al formulario
  const iniciarEdicion = (medicamento: Medicamento) => {
    setMedicamentoEdit(medicamento); // Establece el medicamento a editar
  };

  // Función para cancelar la edición, reseteando el estado de edición
  const cancelarEdicion = () => {
    setMedicamentoEdit(null); // Resetea el medicamento en edición
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crud de Medicamentos</h1>
      
      {/* Componente de Formulario para crear o editar medicamentos */}
      <MedicamentoForm
        onSubmit={medicamentoEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={medicamentoEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={medicamentoEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />

      {/* Componente de Tabla para mostrar la lista de medicamentos */}
      <MedicamentoTable
        medicamentos={medicamento} // Pasa la lista de medicamentos al componente de tabla
        onEdit={iniciarEdicion} // Pasa la función para editar un medicamento
        onDelete={manejarEliminar} // Pasa la función para eliminar un medicamento
      />
    </div>
  );
};

export default App; // Exporta el componente para s