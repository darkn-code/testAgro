import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

function Analisis(){
    return (
        <div className="principal-ana">
            <div className="container-analisis">
                <h2>Análisis del cultivo</h2>
                <Link to="/bienvenida-agro">
                <img src="imagenes/cerrar_sesion-removebg-preview.png" className="imagen-seccion" id="regresar"/>
                </Link>
            </div>
        </div>
    );
}

export default Analisis;