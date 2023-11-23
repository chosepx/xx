import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import calendarioImage from './Assets/calendario.jpg'
const AgregarCita = () => {
  const [nuevaCita, setNuevaCita] = useState({
    nombreCliente: '',
    telefono: '',
    correo: '',
    fecha: '',
    hora: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNuevaCita({
      ...nuevaCita,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores al cambiar el valor del campo
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDate = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!validatePhoneNumber(nuevaCita.telefono)) {
      newErrors.telefono = 'Ingrese un número de teléfono válido (solo números)';
      isValid = false;
    }

    if (!validateEmail(nuevaCita.correo)) {
      newErrors.correo = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!validateDate(nuevaCita.fecha)) {
      newErrors.fecha = 'La fecha no puede ser anterior a hoy';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Formatear la hora antes de enviarla
    const horaFormateada = nuevaCita.hora.length === 5 ? `${nuevaCita.hora}:00` : nuevaCita.hora;

    try {
      const response = await fetch('https://localhost:7264/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...nuevaCita, hora: horaFormateada }),
      });

      if (response.ok) {
        navigate('/citas');
      } else {
        console.error('Error al agregar la cita');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de nueva cita', error);
    }
  };

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6">
          <img src={calendarioImage} alt="Calendario" className="img-fluid" />
        </div>
      <div className="col-md-6 ">
      <h2>Agregar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Nombre Cliente</label>
          <input
            type="text"
            className="form-control"
            name="nombreCliente"
            value={nuevaCita.nombreCliente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Teléfono</label>
          <input
            type="number"
            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
            name="telefono"
            value={nuevaCita.telefono}
            onChange={handleChange}
            required
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
            name="correo"
            value={nuevaCita.correo}
            onChange={handleChange}
            required
          />
          {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
            name="fecha"
            value={nuevaCita.fecha}
            onChange={handleChange}
            required
          />
          {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            name="hora"
            value={nuevaCita.hora}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cita
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AgregarCita;
