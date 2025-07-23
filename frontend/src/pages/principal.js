import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';

function Principal(){
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

return(
    <div className="App">
      <img src="/imagenes/maiz2-removebg-preview.png" className="App-icono"/>
        <p class="title">
          CUAYICENTLI
        </p>
    </div>
    );
}

export default Principal;

