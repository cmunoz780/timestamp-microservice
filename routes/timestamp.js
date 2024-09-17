const express = require('express');
const router = express.Router();

// Ruta para manejar fechas con o sin parámetro
router.get('/:date?', (req, res) => {
  const { date } = req.params;
  let dateObj;

  // Si no se proporciona fecha, usar la fecha actual
  if (!date) {
    dateObj = new Date();
  } else {
    // Si la fecha es un número (timestamp), analizarla como timestamp en milisegundos
    if (/^\d+$/.test(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      // Si es una cadena de fecha, analizarla directamente
      dateObj = new Date(date);
    }
  }

  // Validar si la fecha es válida
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver el formato correcto de Unix y UTC
  return res.json({
    unix: dateObj.getTime(), // Milisegundos desde el 1 de enero de 1970
    utc: dateObj.toUTCString() // Formato UTC (Thu, 01 Jan 1970 00:00:00 GMT)
  });
});

module.exports = router;
