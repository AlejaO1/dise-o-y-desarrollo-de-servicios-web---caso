import React from 'react';
import ConversorTextoAVoz from './ConversorTextoAVoz';
import ConversorVozATexto from './ConversorVozATexto';

const Dashboard = ({ usuario }) => {
  return (
    <div>
      <h2>Bienvenido, {usuario}</h2>
      <ConversorTextoAVoz />
      <ConversorVozATexto />
    </div>
  );
};

export default Dashboard;
