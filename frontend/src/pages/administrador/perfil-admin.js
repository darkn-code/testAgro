import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../App.css';

function Perfil() {
  const [usuario, setUsuario] = useState({});
  const username = localStorage.getItem("usuario");
  const [verContrasena, setVerContrasena] = useState(false);
  const [contrasenaOriginal, setContrasenaOriginal] = useState('');

  useEffect(() => {
    if (!username) return;
    fetch(`http://backend:5000/api/usuario/${username}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUsuario(data);
          setContrasenaOriginal(data.contrasena);
        } else {
          console.error('Usuario no encontrado');
        }
      })
      .catch(err => console.error("Error al obtener datos del usuario:", err));
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const actualizarDatos = (e) => {
    e.preventDefault();

    const datosAEnviar = {
      ...usuario,
      contrasena:
        usuario.contrasena && usuario.contrasena !== contrasenaOriginal
          ? usuario.contrasena
          : ''
    };

    fetch(`http://backend:5000/api/usuario/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosAEnviar)
    })
      .then(res => res.json())
      .then(data => {
        alert("Datos actualizados correctamente");
        setContrasenaOriginal(usuario.contrasena);
      })
      .catch(err => console.error("Error al actualizar:", err));
  };

  const subirFoto = (archivo) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Formato de archivo no permitido. Usa JPG o PNG.");
      return;
    }

    const formData = new FormData();
    formData.append("foto", archivo);
    fetch(`http://backend:5000/api/usuario/${username}/foto`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert("Foto actualizada");
        setUsuario(prev => ({ ...prev, ruta_foto: data.ruta_foto }));
      })
      .catch(err => console.error("Error al subir foto:", err));
  };

  return (
    <div className="principal-perfil">
      <div className="contenedor-perfil">
        <form className="datos-usuario" onSubmit={actualizarDatos}>
          <h2>Perfil</h2>
          {usuario.ruta_foto && (<img className="usuario-foto" src={`http://backend:5000${usuario.ruta_foto}`} alt="foto-perfil" onClick={() => document.getElementById("archivoImagen").click()} style={{ cursor: "pointer" }}/>)}
          <input id="archivoImagen" type="file" style={{ display: "none" }} onChange={(e) => subirFoto(e.target.files[0])}/>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input type="text" className="form-control" name="nombre" value={usuario.nombre || ''} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido paterno:</label>
            <input type="text" className="form-control" name="apellido_paterno" value={usuario.apellido_paterno || ''} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido materno:</label>
            <input type="text" className="form-control" name="apellido_materno" value={usuario.apellido_materno || ''} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Edad:</label>
            <input type="text" className="form-control" name="edad" value={usuario.edad || ''} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input type="text" className="form-control" name="usuario" value={usuario.usuario || ''} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input type={verContrasena ? 'text' : 'password'} className="form-control" name="contrasena" value={usuario.contrasena || ''} onChange={handleChange} autoComplete="current-password"/>
              <span className="ojo" onClick={() => setVerContrasena(!verContrasena)}>
                {verContrasena ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button className="btn btn-primary">Actualizar datos</button>
        </form>
        <Link to="/bienvenida-admin">
          <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-perfil" id="regresar-perfil" alt="Cerrar sesión"/>
        </Link>
      </div>
    </div>
  );
}
export default Perfil;
