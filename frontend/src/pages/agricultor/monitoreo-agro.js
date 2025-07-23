import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

function Monitoreo() {
  const [mensaje, setMensaje] = useState('');
  const [monitoreoActivo, setMonitoreoActivo] = useState(false);
  const navigate = useNavigate();

  const iniciarMonitoreo = async () => {
    try {
      if (!monitoreoActivo){
        const response = await fetch('http://192.168.1.70:5000/api/monitoreo/iniciar');
        const data = await response.json();
        setMensaje(data.mensaje);
        setMonitoreoActivo(true);
      } else {
        setMensaje('Monitoreo detenido correctamente');
        setMonitoreoActivo(false);
      }
    } catch (error) {
      console.error('Error al iniciar monitoreo:', error);
      setMensaje('Error al iniciar monitoreo');
    }
  };

  return (
    <div className="principal-mon">
      <div className="monitoreo-container">
      <h2>Monitoreo de cultivo</h2>
      <button className={`btn-iniciar ${monitoreoActivo ? 'activo' : ''}`} onClick={iniciarMonitoreo}>
        {monitoreoActivo ? 'Detener monitoreo' : 'Iniciar monitoreo'}
      </button>
      <Link to="/bienvenida-agro">
      <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-seccion" id="regresar"/>
      </Link>
      {mensaje && <p>{mensaje}</p>}
    </div>
    </div>

  );
}

export default Monitoreo;
