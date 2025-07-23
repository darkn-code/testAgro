import '../App.css';
import {Link} from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from "axios";

function Crearcuenta() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    edad: '',
    usuario: '',
    contrasena: '',
    tipousuario: ''
  });

  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const fotoInputRef = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData){
      data.append(key, formData[key]);
    }
    data.append('foto', foto);

    try {
      const respuesta = await axios.post('http://192.168.50.247:5000/api/usuarios', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(respuesta.data);
      setMensaje('¡Usuario creado correctamente!');
      setFormData({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        edad: '',
        usuario: '',
        contrasena: '',
        tipousuario: ''
      })
      setFoto(null);
      if (fotoInputRef.current) {
        fotoInputRef.current.value = '';
      }
      setTimeout(() => {
      setMensaje('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setMensaje('Hubo un error al crear el usuario');
    }
  };

    return(
        <div className="registro">
            {mensaje && <div className="mensaje-exito">{mensaje}</div>}
            <form className="formularioRegistro" onSubmit={handleSubmit}>
                <h1 className="titulo2">CREAR CUENTA</h1>
                <div className="mb-3">
                  <label htmlFor="exampleInputNombre" className="form-label">Nombre:</label>
                  <input type="text" className="form-control" id="exampleInputNombre" name="nombre" value={formData.nombre} onChange={handleChange} required></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputApellido1" className="form-label">Apellido paterno:</label>
                  <input type="text" className="form-control" id="exampleInputApellido1" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} required></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputApellido1" className="form-label">Apellido materno:</label>
                  <input type="text" className="form-control" id="exampleInputApellido2" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEdad1" className="form-label">Edad:</label>
                  <input type="number" className="form-control" id="exampleInputEdad" name="edad" value={formData.edad} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputUsuario1" className="form-label">Usuario:</label>
                  <input type="text" className="form-control" id="exampleInputUsuario" name="usuario" value={formData.usuario} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputContraseña1" className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" id="exampleInputContraseña" name="contrasena" value={formData.contrasena} onChange={handleChange} autoComplete="new-password" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTipousuario" className="form-label">Tipo de usuario:</label>
                  <select className="form-control" id="exampleInputTipousuario" name="tipousuario" value={formData.tipousuario} onChange={handleChange} required>
                    <option value="">Selecciona una opción</option>
                    <option value="administrador">Administrador</option>
                    <option value="agricultor">Agricultor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputFoto" className="form-label">Subir foto:</label>
                  <input type="file" className="form-control" id="exampleInputFoto" name="foto" onChange={handleFotoChange} ref={fotoInputRef} required></input>
                </div>
                <div className="botones">
                    <button type="submit" className="btn btn-success">Crear cuenta</button>
                    <Link to="/login" className="link2">
                        <button type="button" className="btn btn-warning">Volver al inicio de sesión</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Crearcuenta;
