import '../App.css';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !contrasena) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.50.247:5000/api/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ usuario, contrasena })
      })

      const data = await response.json();  
      if (response.ok && data.user) {
        localStorage.setItem("usuario", data.user.usuario);
        localStorage.setItem('nombre_usuario', data.user.nombre);
        localStorage.setItem('tipo_usuario', data.user.tipo_usuario);
        if (data.user.tipo_usuario === 'administrador'){
          navigate('/bienvenida-admin');
        } else if (data.user.tipo_usuario === 'agricultor'){
          navigate('/bienvenida-agro');
        } else {
        alert("Tipo de usuario no reconocido");
        }
      } else {
        setError(data.error || 'Error al iniciar sesiòn');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
      console.error('Error:', error);
    }
  };

    return (
        <div className="pagina">
            <form className="formulario" onSubmit={handleSubmit}>
                <h1 className="titulo">LOGIN</h1>
                <div className="mb-3">
                    <img src="/imagenes/USUARIO-removebg-preview.png" className="user"/>
                    <label htmlFor="usuario" className="form-label" id="etiqueta1">Usuario:</label>
                    <input type="text" className="form-control" id="usuario" placeholder="Ingresa tu usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <img src="/imagenes/llave-removebg-preview.png" className="password"/>
                    <label htmlFor="contraseña" className="form-label" id="etiqueta2">Contraseña:</label>
                    <input type="password" className="form-control" id="contraseña" placeholder="Ingresa tu contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="btn btn-success w-100">Ingresar</button>
                <div className="pregunta">
                    <label className="form-label">¿No tienes cuenta?</label>
                    <Link to="/crearcuenta" className="link">Registrate aquí</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;