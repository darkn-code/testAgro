import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/principal';
import Login from './pages/login';
import Crearcuenta from './pages/crearcuenta';
import Bienvenidagro from './pages/agricultor/bienvenida-agro';
import Analisisagro from './pages/agricultor/analisis-agro';
import Monitoreoagro from './pages/agricultor/monitoreo-agro';
import Miscultivosagro from './pages/agricultor/miscultivos-agro';
import Perfilagro from './pages/agricultor/perfil-agro';
import Bienvenidadmin from './pages/administrador/bienvenida-admin';
import Perfiladmin from './pages/administrador/perfil-admin';
import Usuariosadmin from './pages/administrador/usuarios-admin';
import Miscultivosadmin from './pages/administrador/miscultivos-admin';
import Analisisadmin from './pages/administrador/analisis-admin';
import Rutaprivada from './pages/ruta-privada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/crearcuenta" element={<Crearcuenta/>}/>
        <Route path="/bienvenida-agro" element={<Rutaprivada tipo="agricultor"><Bienvenidagro/></Rutaprivada>}/>
        <Route path="/analisis-agro" element={<Rutaprivada tipo="agricultor"><Analisisagro/></Rutaprivada>}/>
        <Route path="/monitoreo-agro" element={<Rutaprivada tipo="agricultor"><Monitoreoagro/></Rutaprivada>}/>
        <Route path="/miscultivos-agro" element={<Rutaprivada tipo="agricultor"><Miscultivosagro/></Rutaprivada>}/>
        <Route path="/perfil-agro" element={<Rutaprivada tipo="agricultor"><Perfilagro/></Rutaprivada>}/>
        <Route path="/bienvenida-admin" element={<Rutaprivada tipo="administrador"><Bienvenidadmin/></Rutaprivada>}/>
        <Route path="/perfil-admin" element={<Rutaprivada tipo="administrador"><Perfiladmin/></Rutaprivada>}/>
        <Route path="/usuarios-admin" element={<Rutaprivada tipo="administrador"><Usuariosadmin/></Rutaprivada>}/>
        <Route path="/miscultivos-admin" element={<Rutaprivada tipo="administrador"><Miscultivosadmin/></Rutaprivada>}/>
        <Route path="/analisis-admin" element={<Rutaprivada tipo="administrador"><Analisisadmin/></Rutaprivada>}/>
      </Routes>
    </Router>
  );
}

export default App;
