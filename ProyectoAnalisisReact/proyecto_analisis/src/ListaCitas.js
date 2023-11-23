import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListaCitas = () => {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch('https://localhost:7264/api/citas');
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.error('Error al obtener las citas', error);
      }
    };

    fetchCitas();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditarCita = (id) => {
    navigate(`/editarCita/${id}`);
  };

  
  const handleEliminarCita = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Esta acción eliminará la cita. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://localhost:7264/api/citas/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Actualizar la lista de citas después de la eliminación
          const updatedCitas = citas.filter((cita) => cita.id !== id);
          setCitas(updatedCitas);

          Swal.fire({
            icon: 'success',
            title: 'Cita eliminada exitosamente',
          });
        } else {
          console.error('Error al eliminar la cita');
        }
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación', error);
    }
  };

  const handleAgregarCita = () => {
    navigate("/agregarCita");
  };

  return (
    <div
    className=""
    style={{
      backgroundImage: `url('https://techserviceadvance.com/wp-content/uploads/2021/06/curso-reparacion-de-celulares-y-tablets.jpg')`, // Ruta relativa a la imagen
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="text-white">Lista de Citas</h2>
      </div>
      <button className="btn btn-primary" onClick={handleAgregarCita}>
        Agregar Nueva Cita
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Cliente</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.nombreCliente}</td>
              <td>{cita.telefono}</td>
              <td>{cita.correo}</td>
              <td>{formatDate(cita.fecha)}</td>
              <td>{cita.hora}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEditarCita(cita.id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleEliminarCita(cita.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ListaCitas;
