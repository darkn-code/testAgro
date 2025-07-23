import {Navigate} from 'react-router-dom';

function Rutaprivada({children, tipo}){
    const usuario = localStorage.getItem('nombre_usuario');
    const tipoUsuario = localStorage.getItem('tipo_usuario');

    if(!usuario || tipoUsuario !== tipo){
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default Rutaprivada;