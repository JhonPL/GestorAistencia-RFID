const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json()); // leer JSON en POST

app.post('/registrar-asistencia', async (req, res) => {
  const { codigo_tarjeta, aula_id } = req.body;

  const now = new Date('2025-03-11T16:30:00'); // 📌 Martes a las 14:30
  const diaSemana = now.getDay(); // 2 = martes
  const horaActual = now.toTimeString().slice(0, 8); // '14:30:00'
  const fechaActual = now.toISOString().split('T')[0]; // '2025-03-11'
  // const now = new Date();
  // const diaSemana = now.getDay(); // 0=Domingo, 1=Lunes...
  // const horaActual = now.toTimeString().slice(0, 8); // 'HH:MM:SS'
  // const fechaActual = now.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  try {
    // 1. Buscar estudiante
    const estudiante = await pool.query(
      'SELECT Id FROM Estudiante WHERE codigo_tarjeta = $1',
      [codigo_tarjeta]
    );
    if (estudiante.rows.length === 0)
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    const estudianteId = estudiante.rows[0].id;

    // 2. Buscar curso activo en ese aula, día y hora
    const curso = await pool.query(`
      SELECT c.Id AS curso_id
      FROM Aula_Curso_Horario ach
      JOIN Curso c ON ach.Curso_Id = c.Id
      JOIN Horario h ON ach.Horario_Id = h.Id
      WHERE ach.Aula_Id = $1
        AND h.Dia_semana_Id = $2
        AND h.Hora_inicio <= $3 AND h.Hora_fin >= $3
        AND $4 BETWEEN c.fecha_inicio AND c.fecha_fin
    `, [aula_id, diaSemana, horaActual, fechaActual]);

    if (curso.rows.length === 0)
      return res.status(404).json({ mensaje: 'No hay clase activa en este momento' });
    const cursoId = curso.rows[0].curso_id;

    // 3. Verificar si el estudiante pertenece a ese curso
    const lista = await pool.query(
      `SELECT Id FROM lista_estudiantes WHERE Estudiante_Id = $1 AND Curso_Id = $2`,
      [estudianteId, cursoId]
    );
    if (lista.rows.length === 0)
      return res.status(403).json({ mensaje: 'Estudiante no pertenece a este curso' });

    const listaEstudiantesId = lista.rows[0].id;

    // 4. Registrar asistencia
    await pool.query(`
      INSERT INTO Asistencia (fecha_registro, hora_registro, Estado, lista_estudiantes_Id)
      VALUES ($1, $2, 'Presente', $3)
    `, [fechaActual, horaActual, listaEstudiantesId]);

    res.status(201).json({ mensaje: 'Asistencia registrada correctamente' });

  } catch (error) {
    console.error('Error al registrar asistencia:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }

  console.log("🛠️ Datos recibidos:", req.body);
});



/// Tarea automática de inasistencia ///

const cron = require('node-cron');

cron.schedule('*/10 * * * *', async () => {
  console.log('⏱ Ejecutando tarea automática de inasistencia...');

  const now = new Date();
  const diaSemana = now.getDay();
  const horaActual = now.toTimeString().slice(0, 8);
  const fechaActual = now.toISOString().split('T')[0];

  try {
    const cursosActivos = await pool.query(`
      SELECT ach.Curso_Id, ach.Horario_Id, ach.Aula_Id
      FROM Aula_Curso_Horario ach
      JOIN Horario h ON ach.Horario_Id = h.Id
      JOIN Curso c ON ach.Curso_Id = c.Id
      WHERE h.Dia_semana_Id = $1
        AND h.Hora_fin < $2
        AND $3 BETWEEN c.fecha_inicio AND c.fecha_fin
    `, [diaSemana, horaActual, fechaActual]);

    for (const curso of cursosActivos.rows) {
      const { curso_id } = curso;

      const estudiantes = await pool.query(`
        SELECT le.Id AS lista_id
        FROM lista_estudiantes le
        LEFT JOIN asistencia a ON le.Id = a.lista_estudiantes_Id AND a.fecha_registro = $1
        WHERE le.Curso_Id = $2 AND a.Id IS NULL
      `, [fechaActual, curso_id]);

      for (const estudiante of estudiantes.rows) {
        await pool.query(`
          INSERT INTO Asistencia (fecha_registro, hora_registro, Estado, lista_estudiantes_Id)
          VALUES ($1, $2, 'Ausente', $3)
        `, [fechaActual, horaActual, estudiante.lista_id]);
      }
    }

    console.log('✅ Inasistencias registradas automáticamente.');
  } catch (error) {
    console.error('❌ Error en tarea automática de asistencia:', error);
  }
});

// app.post('/forzar-inasistencias', async (req, res) => {
//   const now = new Date();
//   const diaSemana = now.getDay();
//   const horaActual = now.toTimeString().slice(0, 8);
//   const fechaActual = now.toISOString().split('T')[0];

//   try {
//     const cursosActivos = await pool.query(`
//       SELECT ach.Curso_Id, ach.Horario_Id, ach.Aula_Id
//       FROM Aula_Curso_Horario ach
//       JOIN Horario h ON ach.Horario_Id = h.Id
//       JOIN Curso c ON ach.Curso_Id = c.Id
//       WHERE h.Dia_semana_Id = $1
//         AND h.Hora_fin < $2
//         AND $3 BETWEEN c.fecha_inicio AND c.fecha_fin
//     `, [diaSemana, horaActual, fechaActual]);

//     let totalAusentes = 0;

//     for (const curso of cursosActivos.rows) {
//       const { curso_id } = curso;

//       const estudiantes = await pool.query(`
//         SELECT le.Id AS lista_id
//         FROM lista_estudiantes le
//         LEFT JOIN asistencia a ON le.Id = a.lista_estudiantes_Id AND a.fecha_registro = $1
//         WHERE le.Curso_Id = $2 AND a.Id IS NULL
//       `, [fechaActual, curso_id]);

//       for (const estudiante of estudiantes.rows) {
//         await pool.query(`
//           INSERT INTO Asistencia (fecha_registro, hora_registro, Estado, lista_estudiantes_Id)
//           VALUES ($1, $2, 'Ausente', $3)
//         `, [fechaActual, horaActual, estudiante.lista_id]);

//         totalAusentes++;
//       }
//     }

//     res.json({ mensaje: `Se marcaron ${totalAusentes} ausencias automáticamente.` });
//   } catch (error) {
//     console.error('Error al forzar inasistencias:', error);
//     res.status(500).json({ mensaje: 'Error al forzar inasistencias' });
//   }
// });



const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
