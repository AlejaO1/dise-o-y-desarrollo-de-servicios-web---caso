import React from 'react';

function ConversorVozATexto({ vozATexto, grabarVozATexto }) {
  return (
    <section>
      <h3>Conversor de Voz a Texto</h3>
      <button onClick={grabarVozATexto}>Grabar</button>
      <p>{vozATexto}</p>
    </section>
  );
}

export default ConversorVozATexto;


