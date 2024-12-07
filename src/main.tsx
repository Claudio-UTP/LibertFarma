import React from 'react';  // Importa React para poder crear componentes
import Reactdom from 'react-dom/client';// Importa Reactdom para renderizar la aplicación en el dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa los componentes de React Router para la navegación
import Appfarmacia from './Appfarmacia';// Importa el componente para la página de farmacias
import App from './App';
import Appmedico from './Appmedico';// Importa el componente para la página de medicos
import Appmedicamento from './Appmedicamento';// Importa el componente para la página de medicamentos
import Navbar from './components/Navbar';// Importa el componente de la barra de navegación

Reactdom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/farmacias" element={<Appfarmacia />} />
        <Route path="/" element={<App />} />
        <Route path="/medicos" element={<Appmedico />} />
        <Route path="/medicamentos" element={<Appmedicamento />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

