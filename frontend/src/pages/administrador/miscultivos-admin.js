import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Miscultivos() {
    const [filas, setFilas] = useState([]);
    const encabezado = [
        'Nombre del cultivo', 'Descripción del cultivo', 'Nombre de la plaga', 
        'Tipo de plaga', 'Descripcion de plaga', 'Nombre de tratamiento', 
        'Tipo de tratamiento', 'Descripcion de aplicación', 'Porcentaje de plaga en la parcel', 
        'Nombre de la parcela', 'Descripción de parcela', 'Foto de parcela',
        'Ubicacion'
    ];
    const [cultivosExistentes, setCultivosExistentes] = useState([]);
    useEffect(() => {
        fetch("http://192.168.1.70:5000/api/cultivos")
          .then(res => res.json())
          .then (data => setCultivosExistentes(data))
          .catch(err => console.error("Error al cargar cultivos:", err));
    }, []);

    const guardarRegistros = async () => {
        try {
            const response = await fetch("http://192.168.1.70:5000/api/cultivos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filas),
            });
            if (response.ok) {
                alert("Registros guardados exitosamente");
                setFilas([]);
                const res = await fetch("http://192.168.1.70:5000/api/cultivos");
                const data = await res.json();
                setCultivosExistentes(data);
            } else {
                alert("Error al guardar los registros");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Error en la conexión con el servidor");
        }
    };

    const guardarEdicionCultivo = async (cultivo) => {
        try {
            const response = await fetch(`http://192.168.1.70:5000/api/cultivos/${cultivo.id_cultivo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cultivo),
            });
            if (response.ok) {
                alert("Cultivo actualizado correctamente");
            } else {
                alert("Error al actualizar el cultivo");
            }
        } catch (error){
            console.error("Error al actualizar:", error);
        }
    };

    const eliminarcultivoBD = async (id_cultivo) => {
        try {
            const response = await fetch(`http://192.168.1.70:5000/api/cultivos/${id_cultivo}`, {
                method: "DELETE",
            });
            if(response.ok){
                alert("Registro eliminado");
                setCultivosExistentes(cultivosExistentes.filter(c => c.id_cultivo !== id_cultivo));
            } else {
                alert("Error al eliminar cultivo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const agregarRegistro = () => {
        const nuevaFila = encabezado.map(() => '');
        setFilas([...filas, nuevaFila]);
    };

    const eliminarFilas = (index) => {
        const nuevasFilas = filas.filter((_, i) => i !== index);
        setFilas(nuevasFilas);
    };

    const handleChange = (filaIndex, colIndex, value) => {
        const nuevasFilas = [...filas];
        nuevasFilas[filaIndex][colIndex] = value;
        setFilas(nuevasFilas);
    };

    const handleUpdateField = (index, campo, valor) => {
        const nuevosCultivos = [... cultivosExistentes];
        nuevosCultivos[index][campo] = valor;
        setCultivosExistentes(nuevosCultivos);
    };

    return (
        <div className="principal-mis">
        <div className="contenedor-cultivos">
            <h2>Mis cultivos</h2>
            <button className="boton-agregar" onClick={agregarRegistro}>Agregar registro</button>
            <div className="tabla-cultivos-admin">
                <div className="tabla-con-botones">
                    <div className="tabla-scroll">
                        <table border="1">
                            <thead>
                                <tr>
                                    {encabezado.map((titulo, index) => (
                                        <th key={index}>{titulo}</th>
                                    ))}
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cultivosExistentes.map((cultivo, index) => (
                                    <tr key={`existente-${index}`}>
                                        <td><input value={cultivo.nombre_cultivo} onChange={(e) => handleUpdateField(index, 'nombre_cultivo', e.target.value)}/></td>
                                        <td><input value={cultivo.descripcion_cultivo} onChange={(e) => handleUpdateField(index, 'descripcion_cultivo', e.target.value)}/></td>
                                        <td><input value={cultivo.nombre_plaga} onChange={(e) => handleUpdateField(index, 'nombre_plaga', e.target.value)}/></td>
                                        <td><input value={cultivo.tipo_plaga} onChange={(e) => handleUpdateField(index, 'tipo_plaga', e.target.value)}/></td>
                                        <td><input value={cultivo.descripcion_plaga} onChange={(e) => handleUpdateField(index, 'descripcion_plaga', e.target.value)}/></td>
                                        <td><input value={cultivo.nombre_tratamiento} onChange={(e) => handleUpdateField(index, 'nombre_tratamiento', e.target.value)}/></td>
                                        <td><input value={cultivo.tipo_tratamiento} onChange={(e) => handleUpdateField(index, 'tipo_tratamiento', e.target.value)}/></td>
                                        <td><input value={cultivo.descripcion_tratamiento} onChange={(e) => handleUpdateField(index, 'descripcion_tratamiento', e.target.value)}/></td>
                                        <td><input value={cultivo.porcentaje_plaga} onChange={(e) => handleUpdateField(index, 'porcentaje_plaga', e.target.value)}/></td>
                                        <td><input value={cultivo.nombre_parcela} onChange={(e) => handleUpdateField(index, 'nombre_parcela', e.target.value)}/></td>
                                        <td><input value={cultivo.descripcion_parcela} onChange={(e) => handleUpdateField(index, 'descripcion_parcela', e.target.value)}/></td>
                                        <td><input value={cultivo.ruta_foto_parcela} onChange={(e) => handleUpdateField(index, 'ruta_foto_parcela', e.target.value)}/></td>
                                        <td><input value={cultivo.descripcion_ubicacion} onChange={(e) => handleUpdateField(index, 'descripcion_ubicacion', e.target.value)}/></td>
                                        <td>
                                            <button className="btn-eliminar" onClick={() => eliminarcultivoBD(cultivo.id_cultivo)}>🗑️</button>
                                            <button className="btn btn-primary" onClick={() => guardarEdicionCultivo(cultivo)}>💾</button>
                                        </td>
                                    </tr>
                                ))}
                                {filas.map((fila, filaIndex) => (
                                    <tr key={filaIndex}>
                                        {fila.map((valor, colIndex) => (
                                            <td key={colIndex}>
                                                <input type="text" value={valor} onChange={(e) => handleChange(filaIndex, colIndex, e.target.value)}/>
                                            </td>
                                        ))}
                                        <td>
                                            <button className="btn-eliminar" onClick={() => eliminarFilas(filaIndex)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button className="btn btn-success" onClick={guardarRegistros}>Guardar registro</button>
            </div>
            <Link to="/bienvenida-admin">
                <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-cultivos" id="regresar-cultivos" alt="Cerrar sesión"/>
            </Link>
        </div>
    </div>
    );
}

export default Miscultivos;
