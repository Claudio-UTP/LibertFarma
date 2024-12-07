export interface Medicamento { // Define la interfaz Medicamento que refleja la entidad del backend
    id: number;  // Identificador único del medicamento            
    nombre: string;    // Nombre del medicamento  
    descripcion: string;   // Descripcion del medicamento
    receta: string;   // Receta del medicamento     
    tipo: string;   // Tipo del medicamento
    cantidad:number;   // Cantidad del medicamento
    precio:number;   // Precio del medicamento
  }
  