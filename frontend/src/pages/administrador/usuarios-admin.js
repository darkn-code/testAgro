import '../../App.css';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Usuarios(){
    const [filas, setFilas] = useState([]);
    const encabezado_tabla = [
            'Nombre', 'Apellido paterno', 'Apellido materno',
            'Edad', 'Usuario', 'Contraseña',
            'Tipo de usuario', 'Foto'
        ];
    const handleChange = (filaIndex, colIndex, value) => {
        const nuevasFilas = [...filas];
        nuevasFilas[filaIndex][colIndex] = value;
        setFilas(nuevasFilas);
    };
    
    return(
        <div className="principal-usuarios">
            <div className="cuadro">
                <h2>Usuarios</h2>
                <div className="tabla-usuarios">
                    <div className="tabla-con-botones">
                    <div className="tabla-scroll">
                        <table border="1">
                            <thead>
                                <tr>
                                    {encabezado_tabla.map((titulo, index) => (
                                        <th key={index}>{titulo}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filas.map((fila, filaIndex) => (
                                    <tr key={filaIndex}>
                                        {fila.map((valor, colIndex) => (
                                            <td key={colIndex}>
                                                <input type="text" value={valor} onChange={(e) => handleChange(filaIndex, colIndex, e.target.value)
                                                    }
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                    <Link to="/bienvenida-admin">
                        <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-seccion" id="regresar"/>
                    </Link>
            </div>
        </div>
    );
}

export default Usuarios;