import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación de rutas
import './Navbar.css'; 

// Definición del componente Navbar como función constante
const Navbar = () => {
  return (
    <nav>
      <ul>
      <li><Link to="/farmacias">Farmacias</Link></li> 
        <li><Link to="/">Clientes</Link></li>
        <li><Link to="/medicos">Médicos</Link></li>
        <li><Link to="/medicamentos">Medicamentos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;// Exporta el componente Navbar para que pueda ser utilizado en otras partes de la aplicación
