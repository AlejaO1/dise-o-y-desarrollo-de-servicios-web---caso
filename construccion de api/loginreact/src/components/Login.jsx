import React from 'react';

function Login({ usuario, clave, cambiarUsuario, cambiarClave, Ingresar }) {
  return (
    <div>
      <h1>Inicio Sesión</h1>
      <form>
        <label htmlFor="usuario">Usuario</label>
        <input 
          type="text" 
          id="usuario" 
          name="usuario" 
          placeholder="Ingrese su usuario"
          value={usuario} 
          onChange={cambiarUsuario} 
        />

        <label htmlFor="clave">Clave</label>
        <input 
          type="password" 
          id="clave" 
          name="clave" 
          placeholder="Ingrese su clave"
          value={clave} 
          onChange={cambiarClave} 
        />

        <button type="button" onClick={Ingresar}>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
