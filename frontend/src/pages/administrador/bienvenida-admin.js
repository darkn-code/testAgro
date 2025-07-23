import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Bienvenida() {
  const [nombre, setNombre] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nombreguardado = localStorage.getItem('nombre_usuario');
    if (nombreguardado) {
      setNombre(nombreguardado);
      setNombreUsuario(nombreguardado);
      fetch(`http://192.168.1.70:5000/api/usuario/${nombreguardado}`)
      .then(res=>res.json())
      .then(data=>{
        if(data.ruta_foto){
          setFotoPerfil(`hhttp://192.168.1.70:5000/api${data.ruta_foto}`);
        }
      })
      .catch(err=>console.error('Error al obtener la foto:', err));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  const togglemenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="principal-bienvenida">
    <div className="container">
      <div className="menutoggle" onClick={togglemenu}>
        <img src="../imagenes/menu.png"/>
      </div>
      <div className={`sidebar ${menuAbierto ? 'active' : ''}`}>
        <div className="perfil">
          {fotoPerfil && (<img src={fotoPerfil} alt="Foto de perfil" className="foto-perfil" />)}
          <Link to="/perfil-admin" className="nombre-usuario">{nombre}</Link>
        </div>
        <div className="menulateral">
          <Link to="/usuarios-admin">
            <button className="btn btn-success w-100" id="boton">Usuarios</button>
          </Link>
          <button onClick={cerrarSesion} className="btn bg-transparent border-0 p-0">
            <img src="../imagenes/log_out-removebg-preview.png" className="icono cerrar_sesion" />
          </button>
        </div>
      </div>

      <div className="bienvenida">
        <h2 className="letrero">¡Bienvenid@ {nombre}!</h2>
        <div className="secciones">
          <div className="seccion">
            <Link to="/miscultivos-admin">
            <img src="imagenes/cultivo-edomex.jpeg" className="imagen-seccion" id="monitoreo"/>
            </Link>
            <label className="form-label">Mis cultivos</label>
            </div>
            <div className="seccion">
                <Link to="/analisis-admin">
                <img src="/imagenes/analisis datos.jpg" className="imagen-seccion" id="analisis"/>
                </Link>
                <label className="form-label">Análisis</label>
                </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Bienvenida;
