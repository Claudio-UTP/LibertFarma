import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Farmacia } from '../typesfarmacia'; // Importa la interfaz Farmacia

// Define las propiedades que recibirá el componente
interface FarmaciaFormProps {
  onSubmit: (farmacia: Omit<Farmacia, 'id'>) => void; // Función que se ejecuta al enviar el formulario
  initialData?: Farmacia; // Datos iniciales para editar (opcional)
  onCancel?: () => void; // Función para cancelar la edición (opcional)
}

const FarmaciaForm: React.FC<FarmaciaFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
  const [direccion, setDireccion] = useState(initialData?.direccion || ''); // Estado para 'direccion'
  const [telefono, setTelefono] = useState(initialData?.telefono || ''); // Estado para 'telefono'
  const [email, setEmail] = useState(initialData?.email || ''); // Estado para 'email'
  const [horario, setHorario] = useState(initialData?.horario || ''); // Estado para 'horario'
  
  
  // Hook que actualiza los campos del formulario cuando 'initialData' cambia
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion);
      setEmail(initialData.email);
      setTelefono(initialData.telefono);
      setHorario(initialData.horario);
      
    } else {
      // Si no hay datos iniciales, limpia los campos
      setNombre('');
      setDireccion('');
      setEmail('');
      setTelefono('');
      setHorario('');
    }
  }, [initialData]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    onSubmit({ nombre,direccion, email,telefono,horario }); // Llama a la función pasada por props con los datos del formulario
    if (!initialData) {
      // Si no se está editando, limpia los campos después de enviar
      setNombre('');
      setDireccion('');
      setEmail('');
      setTelefono('');
      setHorario('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? 'Editar Farmacia' : 'Crear Farmacia'}</h2>

      {/* Campo para 'Nombre' */}
      <input
        type="Nombre"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'nombre' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Direccion' */}
      <input
        type="direccion"
        placeholder="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado 'direccion' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Email' */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Telefono' */}
      <input
        type="telefono"
        placeholder="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado 'telefono' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Horario' */}
      <input
        type="horario"
        placeholder="Horario"
        value={horario}
        onChange={(e) => setHorario(e.target.value)} // Actualiza el estado 'horario' al cambiar el valor
        required // Campo obligatorio
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

export default FarmaciaForm; // Exporta el componente para su uso en otros archivos