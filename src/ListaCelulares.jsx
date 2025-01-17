import React, { useState, useEffect } from "react";
import api from "./api";
import EditarCelular from "./EditarCelular";

const ListaCelulares = () => {
  const [celulares, setCelulares] = useState([]);
  const [celularSeleccionado, setCelularSeleccionado] = useState(null);
  const [tituloBusqueda, setTituloBusqueda] = useState("");
  const [celularesFiltrados, setCelularesFiltrados] = useState([]);

  const fetchCelulares = async () => {
    try {
      const response = await api.get("/celular");
      setCelulares(response.data);
      setCelularesFiltrados(response.data);
    } catch (error) {
      console.error("Error al cargar la lista de celulares:", error);
    }
  };

  useEffect(() => {
    fetchCelulares();
  }, []);

  const handleEditar = (celular) => setCelularSeleccionado(celular);
  const handleCancelarEdicion = () => setCelularSeleccionado(null);
  const handleActualizarLista = () => fetchCelulares();
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este celular?")) {
      try {
        await api.delete(`/celular/${id}`);
        alert("Celular eliminado correctamente.");
        fetchCelulares();
      } catch (error) {
        console.error("Error al eliminar el celular:", error);
        alert("Hubo un error al intentar eliminar el celular.");
      }
    }
  };

  const handleBusqueda = () => {
    const resultadoBusqueda = celulares.filter((celular) =>
      celular.titulo.toLowerCase().includes(tituloBusqueda.toLowerCase())
    );
    setCelularesFiltrados(resultadoBusqueda);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">Lista de Celulares</h1>

      <div className="card shadow p-4 mb-4">
        <h5 className="card-title">Buscar por Título</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa el título del celular"
            value={tituloBusqueda}
            onChange={(e) => setTituloBusqueda(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBusqueda}>
            Buscar
          </button>
        </div>
      </div>

      {celularesFiltrados.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {celularesFiltrados.map((celular) => (
                <tr key={celular.id}>
                  <td>{celular.id}</td>
                  <td>{celular.titulo}</td>
                  <td>{celular.descripcion}</td>
                  <td>
                    <img
                      src={celular.imagen}
                      alt={celular.titulo}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditar(celular)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(celular.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No se encontraron celulares con los criterios de búsqueda.
        </div>
      )}

      {celularSeleccionado && (
        <div className="modal-container">
          <EditarCelular
            celularSeleccionado={celularSeleccionado}
            onCancelar={handleCancelarEdicion}
            onActualizar={handleActualizarLista}
          />
        </div>
      )}
    </div>
  );
};

export default ListaCelulares;
