import React, { useState } from "react";
import api from "./api";

const FormCelular = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);

    try {
      const response = await api.post("/celular", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMensaje(response.data.msg || "Celular creado correctamente");
    } catch (error) {
      const errores = error.response?.data?.errores || ["Error desconocido"];
      setMensaje(errores.join(", "));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Crear Celular</h2>
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <input
              type="file"
              id="imagen"
              className="form-control"
              onChange={(e) => setImagen(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Crear Celular</button>
        </form>
        {mensaje && (
          <div className="alert alert-info mt-3" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCelular;
