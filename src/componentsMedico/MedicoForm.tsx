import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Medico } from '../typesmedico'; // Importa la interfaz Medico
// Define las propiedades que recibirá el componente
interface MedicoFormProps {
    onSubmit: (medico: Omit<Medico, 'id'>) => void; // Función que se ejecuta al enviar el formulario
    initialData?: Medico; // Datos iniciales para editar (opcional)
    onCancel?: () => void; // Función para cancelar la edición (opcional)
  }
  
  const MedicoForm: React.FC<MedicoFormProps> = ({ onSubmit, initialData, onCancel }) => {
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
    const [apellido, setApellido] = useState(initialData?.apellido || ''); // Estado para 'apellido'
    const [telefono, setTelefono] = useState(initialData?.telefono || ''); // Estado para 'telefono'
    const [especialidad, setEspecialidad] = useState(initialData?.especialidad || ''); // Estado para 'especialidad'
    const [email, setEmail] = useState(initialData?.email || ''); // Estado para 'email'
  
    // Hook que actualiza los campos del formulario cuando 'initialData' cambia
    useEffect(() => {
      if (initialData) {
        setNombre(initialData.nombre);
        setApellido(initialData.apellido);
        setTelefono(initialData.telefono);
        setEspecialidad(initialData.especialidad);
        setEmail(initialData.email);
      } else {
        // Si no hay datos iniciales, limpia los campos
        setNombre('');
        setApellido('');
        setTelefono('');
        setEspecialidad('');
        setEmail('');
      }
    }, [initialData]);
  
    // Función que maneja el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario
      onSubmit({ nombre, apellido, telefono, especialidad, email }); // Llama a la función pasada por props con los datos del formulario
      if (!initialData) {
        // Si no se está editando, limpia los campos después de enviar
        setNombre('');
        setApellido('');
        setTelefono('');
        setEspecialidad('');
        setEmail('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {/* Título del formulario que cambia según si se está editando o creando */}
        <h2>{initialData ? 'Editar Médico' : 'Crear Médico'}</h2>
  
        {/* Campo para 'Nombre' */}
        <input
          type="Nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'nombre' al cambiar el valor
          required // Campo obligatorio
          style={{ marginRight: '10px' }}
        />
  
        {/* Campo para 'Apellido' */}
        <input
          type="Apellido"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)} // Actualiza el estado 'apellido' al cambiar el valor
          required
          style={{ marginRight: '10px' }}
        />
  
        {/* Campo para 'Teléfono' */}
        <input
          type="Telefono"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado 'telefono' al cambiar el valor
          required
          style={{ marginRight: '10px' }}
        />
  
        {/* Campo para 'Especialidad' */}
        <input
          type="Especialidad"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)} // Actualiza el estado 'especialidad' al cambiar el valor
          required
          style={{ marginRight: '10px' }}
        />
  
        {/* Campo para 'Email' */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' al cambiar el valor
          required
          style={{ marginRight: '10px' }}
        />
  
        {/* Botón para enviar el formulario, cambia el texto según si se está editando o creando */}
        <button type="submit">{initialData ? 'Actualizar' : 'Crear'}</button>
  
        {/* Botón para cancelar la edición, solo se muestra si se está editando */}
        {initialData && onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>
    );
  };

  export default MedicoForm; // Exporta el componente para su uso en otros archivos