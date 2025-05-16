const pool = require('../db');

exports.registrarAsistencia = async (req, res) => {
  try {
    const { codigo_tarjeta, aula_id } = req.body;
    const fecha = new Date().toISOString().split('T')[0];
    const hora = new Date().toTimeString().split(' ')[0];

    const result = await pool.query(`
      INSERT INTO asistencia (fecha_registro, hora_registro, estado, aula_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [fecha, hora, 'Presente', aula_id]
    );

    res.status(201).json({ mensaje: 'Asistencia registrada', data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar asistencia' });
  }
};
