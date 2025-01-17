import React, { useState, useEffect } from "react";
import api from "./api";

const EditarCelular = ({ celularSeleccionado, onCancelar, onActualizar }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  
  useEffect(() => {
    if (celularSeleccionado) {
      setTitulo(celularSeleccionado.titulo);
      setDescripcion(celularSeleccionado.descripcion);
    }
  }, [celularSeleccionado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      await api.put(`/celular/${celularSeleccionado.id}`, formData);
      onActualizar(); // Actualiza la lista en el componente principal
      onCancelar(); // Cierra el formulario de edición
    } catch (error) {
      console.error("Error al editar el celular:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">Editar Celular</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen (opcional)</label>
            <input
              type="file"
              id="imagen"
              className="form-control"
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-45">Guardar cambios</button>
            <button
              type="button"
              className="btn btn-secondary w-45"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCelular;
