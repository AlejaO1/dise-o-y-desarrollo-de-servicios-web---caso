import React from 'react';

function ConversorTextoAVoz({ textoAVoz, cambiarTexto, convertirTextoAVoz }) {
  return (
    <section>
      <h3>Conversor de Texto a Voz</h3>
      <input
        type="text"
        id="textoAVoz"
        placeholder="Escribe algo para convertir a voz"
        value={textoAVoz}
        onChange={cambiarTexto}
      />
      <button onClick={convertirTextoAVoz}>Convertir</button>
    </section>
  );
}

export default ConversorTextoAVoz;

