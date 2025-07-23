import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Miscultivos() {
    const [filas, setFilas] = useState([]);
    const encabezado = [
        'Nombre del cultivo', 'Tipo de cultivo', 'Descripción del cultivo',
        'Nombre de la plaga', 'Tipo de plaga', 'Descripcion de plaga',
        'Nombre de tratamiento', 'Tipo de tratamiento', 'Descripcion de tratamiento',
        'Porcentaje de plaga', 'Nombre de la parcela', 'Descripción de parcela', 'Ubicacion'
    ];

    const handleChange = (filaIndex, colIndex, value) => {
        const nuevasFilas = [...filas];
        nuevasFilas[filaIndex][colIndex] = value;
        setFilas(nuevasFilas);
    };

    return (
        <div className="principal-mis">
        <div className="contenedor-cultivos">
            <h2>Mis cultivos</h2>
            <div className="tabla-cultivos">
                <div className="tabla-con-botones">
                    <div className="tabla-scroll">
                        <table border="1">
                            <thead>
                                <tr>
                                    {encabezado.map((titulo, index) => (
                                        <th key={index}>{titulo}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filas.map((fila, filaIndex) => (
                                    <tr key={filaIndex}>
                                        {fila.map((valor, colIndex) => (
                                            <td key={colIndex}>
                                                <input
                                                    type="text"
                                                    value={valor}
                                                    onChange={(e) =>
                                                        handleChange(filaIndex, colIndex, e.target.value)
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
            <Link to="/bienvenida-agro">
                <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-cultivos" id="regresar-cultivos" alt="Cerrar sesión"/>
            </Link>
        </div>
    </div>
    );
}

export default Miscultivos;
