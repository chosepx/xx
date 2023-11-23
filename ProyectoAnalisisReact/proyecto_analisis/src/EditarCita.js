import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarCita = () => {
  const [cita, setCita] = useState({
    nombreCliente: '',
    telefono: '',
    correo: '',
    fecha: '',
    hora: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await fetch(`https://localhost:7264/api/citas/${id}`);
        const data = await response.json();
        // Ajusta el formato de la fecha
        data.fecha = data.fecha.split('T')[0];
        setCita(data);
      } catch (error) {
        console.error('Error al obtener la cita', error);
      }
    };

    fetchCita();
  }, [id]);

  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7264/api/citas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cita),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cita editada exitosamente',
        });
        navigate('/citas');
      } else {
        console.error('Error al editar la cita');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de edición', error);
    }
  };

  return (
    <div className="container mt-4">
    <div className="row">
      <h2>Editar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Cliente</label>
          <input
            type="text"
            className="form-control"
            name="nombreCliente"
            value={cita.nombreCliente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            value={cita.telefono}
            onChange={handleChange}
            pattern="[0-9]+"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={cita.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={cita.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            name="hora"
            value={cita.hora}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>  </div>
  );
};

export default EditarCita;
