import React, { useState } from 'react';
import './MisCursos.css';

const cursos = [
  {
    id: 1,
    titulo: 'A_Ingenieria_Economica_2510_2520',
    fechaFin: 'junio 14, 2025 a la(s) 19:00',
    imagen: 'https://img.freepik.com/free-vector/stock-market-concept_23-2148532289.jpg',
    estudiantes: ['Juan Pérez', 'María Rodríguez', 'Carlos Martínez'],
  },
  {
    id: 2,
    titulo: 'A_Electiva_Especifica_I_2510_4625',
    fechaFin: 'junio 14, 2025 a la(s) 19:00',
    imagen: 'https://img.freepik.com/free-photo/abstract-digital-flower-background_23-2149426922.jpg',
    estudiantes: ['Laura Jiménez', 'Pedro Gómez', 'Ana Torres'],
  },
  {
    id: 3,
    titulo: 'A_Aplicacion_de_la_Inteligencia_2510_2270',
    fechaFin: 'junio 14, 2025 a la(s) 19:00',
    imagen: 'https://img.freepik.com/free-photo/technology-background-with-ai-brain_23-2149192375.jpg',
    estudiantes: ['Luis Ángel', 'Daniela Suárez', 'Kevin Rojas'],
  },
];


const MisCursos = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const handleVerAsistencias = (curso) => {
    setCursoSeleccionado(curso);
  };

  const handleVolver = () => {
    setCursoSeleccionado(null);
  };

  if (cursoSeleccionado) {
    return (
      <div className="mis-cursos-container">
        <h1 className="titulo">Asistencias - {cursoSeleccionado.titulo}</h1>
        <h3>Listado de estudiantes</h3>
        <ul className="asistencia-lista">
          {cursoSeleccionado.estudiantes.map((nombre, index) => (
            <li key={index}>{index + 1}. {nombre}</li>
          ))}
        </ul>
        <button onClick={handleVolver} className="volver-btn">← Volver</button>
      </div>
    );
  }

  return (
    <div className="mis-cursos-container">
      <h1 className="titulo">Mis cursos</h1>
      <div className="cards">
        {cursos.map((curso) => (
          <div key={curso.id} className="card">
            <img src={curso.imagen} alt={curso.titulo} className="card-img" />
            <div className="card-content">
              <h2 className="card-title">{curso.titulo}</h2>
              <p className="card-date">Finaliza el {curso.fechaFin}</p>
              <button
                className="asistencias-btn"
                onClick={() => handleVerAsistencias(curso)}
              >
                Ver asistencias
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisCursos;
