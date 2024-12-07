import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Medicamento } from '../typesmedicamento'; // Importa la interfaz Medicamento

// Define las propiedades que recibirá el componente
interface MedicamentoFormProps {
  onSubmit: (medicamento: Omit<Medicamento, 'id'>) => void; // Función que se ejecuta al enviar el formulario
  initialData?: Medicamento; // Datos iniciales para editar (opcional)
  onCancel?: () => void; // Función para cancelar la edición (opcional)
}

const MedicamentoForm: React.FC<MedicamentoFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || ''); // Estado para 'descripcion'
  const [receta, setReceta] = useState(initialData?.receta || ''); // Estado para 'receta'
  const [tipo, setTipo] = useState(initialData?.tipo || ''); // Estado para 'tipo'
  const [cantidad, setCantidad] = useState(initialData?.cantidad ||0); // Estado para 'cantidad'
  const [precio, setPrecio] = useState(initialData?.precio ||0); // Estado para 'precio'
  
  // Hook que actualiza los campos del formulario cuando 'initialData' cambia
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion);
      setReceta(initialData.receta);
      setTipo(initialData.tipo);
      setCantidad(initialData.cantidad);
      setPrecio(initialData.precio);
    } else {
      // Si no hay datos iniciales, limpia los campos
      setNombre('');
      setDescripcion('');
      setReceta('');
      setTipo('');
      setCantidad(0);
      setPrecio(0);
    }
  }, [initialData]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    onSubmit({ nombre,descripcion, receta, tipo,cantidad,precio }); // Llama a la función pasada por props con los datos del formulario
    if (!initialData) {
      // Si no se está editando, limpia los campos después de enviar
      setNombre('');
      setNombre('');
      setDescripcion('');
      setReceta('');
      setTipo('');
      setCantidad(0);
      setPrecio(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? 'Editar Medicamento' : 'Crear Medicamento'}</h2>

      {/* Campo para 'Nombre' */}
      <input
        type="Nombre"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'nombre' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/*Campo para 'Descripcion' */}
      <input
        type="Descipcion"
        placeholder="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)} // Actualiza el estado 'descripcion' al cambiar el valor
        required
        style={{ marginRight: '10px' }}
      />

      {/* Campo para  'Receta' */}
      <input
        type="Receta"
        placeholder="Receta"
        value={receta}
        onChange={(e) => setReceta(e.target.value)} // Actualiza el estado 'receta' al cambiar el valor
        required
        style={{ marginRight: '10px' }}
      />

      {/* Campo para  'Tipo' */}
      <input
        type="Tipo"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)} // Actualiza el estado 'tipo' al cambiar el valor
        required
        style={{ marginRight: '10px' }}
      />

      {/* Campo para  'Cantidad' */}
      <input
        type="Cantidad"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}// Actualiza el estado 'cantidad' al cambiar el valor
        required
      />

      {/* Campo para 'Precio' */}
      <input
        type="Precio"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))} // Update 'precio' state
        required
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

export default MedicamentoForm; // Exporta el componente para su uso en otros archivos