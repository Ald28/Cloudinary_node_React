import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import FormCelular from "./FormCelular";
import ListaCelulares from "./ListaCelulares";

function App() {
  return (
    <div className="App container mt-4">
      <h1 className="text-center mb-4">Gestión de Celulares</h1>
      
      <div className="card p-4 mb-4 shadow-sm">
        <h2 className="text-center mb-4">Crear Celular</h2>
        <FormCelular />
      </div>
      
      <hr className="my-4" />
      
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Lista de Celulares</h2>
        <ListaCelulares />
      </div>
    </div>
  );
}

export default App;
