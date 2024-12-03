import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ConversorTextoAVoz from './components/ConversorTextoAVoz';
import ConversorVozATexto from './components/ConversorVozATexto';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [textoAVoz, setTextoAVoz] = useState('');
  const [vozATexto, setVozATexto] = useState('');

  const cambiarUsuario = (evento) => setUsuario(evento.target.value);
  const cambiarClave = (evento) => setClave(evento.target.value);

  // Función para manejar el inicio de sesión
  async function Ingresar() {
    try {
      const peticion = await fetch(`http://localhost:3000/login?usuario=${usuario}&clave=${clave}`, {
        method: 'GET',
        credentials: 'include',  // Enviar las credenciales en la solicitud
      });
      if (peticion.ok) {
        setLogueado(true);  // Si el login es exitoso, actualizar el estado de logueado
      } else {
        alert('Datos incorrectos');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  // Función para validar la sesión al cargar la página
  async function validarSesion() {
    try {
      const peticion = await fetch('http://localhost:3000/validar', {
        method: 'GET',
        credentials: 'include',  // Enviar las credenciales en la solicitud
      });
      if (peticion.ok) {
        setLogueado(true);  // Si la sesión es válida, mantener el estado de logueado
      } else {
        setLogueado(false);  // Si no es válida, asegurarse de que no esté logueado
      }
    } catch (error) {
      console.error('Error de validación de sesión:', error);
    }
  }

  useEffect(() => {
    // Validamos la sesión al cargar el componente
    validarSesion();
  }, []);

  const cambiarTexto = (evento) => setTextoAVoz(evento.target.value);

  const convertirTextoAVoz = () => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(textoAVoz);
    synth.speak(utterThis);
  };

  const grabarVozATexto = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
    recognition.onresult = (event) => setVozATexto(event.results[0][0].transcript);
  };

  return (
    <div className="container">
      {logueado ? (
        <>
          <h1>Conversor TTS y STT</h1>
          <ConversorTextoAVoz
            textoAVoz={textoAVoz}
            cambiarTexto={cambiarTexto}
            convertirTextoAVoz={convertirTextoAVoz}
          />
          <ConversorVozATexto
            vozATexto={vozATexto}
            grabarVozATexto={grabarVozATexto}
          />
        </>
      ) : (
        <Login
          usuario={usuario}
          clave={clave}
          cambiarUsuario={cambiarUsuario}
          cambiarClave={cambiarClave}
          Ingresar={Ingresar}
        />
      )}
    </div>
  );
}

export default App;



