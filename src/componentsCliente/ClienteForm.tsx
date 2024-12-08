import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Cliente } from '../types'; // Importa la interfaz Cliente

// Define las propiedades que recibirá el componente
interface ClienteFormProps {
  onSubmit: (cliente: Omit<Cliente, 'id'>) => void; // Función que se ejecuta al enviar el formulario
  initialData?: Cliente; // Datos iniciales para editar (opcional)
  onCancel?: () => void; // Función para cancelar la edición (opcional)
}

const ClienteForm: React.FC<ClienteFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
  const [apellido, setApellido] = useState(initialData?.apellido || ''); // Estado para 'apellido'
  const [telefono, setTelefono] = useState(initialData?.telefono || ''); // Estado para 'telefono'
  const [email, setEmail] = useState(initialData?.email || ''); // Estado para 'email'
  const [direccion, setDireccion] = useState(initialData?.direccion || ''); // Estado para 'direccion'
  
  // Hook que actualiza los campos del formulario cuando 'initialData' cambia
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setApellido(initialData.apellido);
      setEmail(initialData.email);
      setTelefono(initialData.telefono);
      setDireccion(initialData.direccion);
    } else {
      // Si no hay datos iniciales, limpia los campos
      setNombre('');
      setApellido('');
      setEmail('');
      setDireccion('');
      setTelefono('');
 
    }
  }, [initialData]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    onSubmit({ nombre, apellido, email,direccion,telefono }); // Llama a la función pasada por props con los datos del formulario
    if (!initialData) {
      // Si no se está editando, limpia los campos después de enviar
      setNombre('');
      setApellido('');
      setEmail('');
      setDireccion('');
      setTelefono('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? 'Editar Cliente' : 'Crear Cliente'}</h2>

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

        {/* Campo para 'Direccion' */}
        <input
        type="direccion"
        placeholder="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado 'direccion' al cambiar el valor
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

export default ClienteForm; // Exporta el componente para su uso en otros archivos