const express = require('express');
const router = express.Router();

// Ruta para manejar fechas con o sin parámetro
router.get('/:date?', (req, res) => {
  let { date } = req.params;
  let dateObj;

  // Si no se proporciona una fecha, se usa la fecha actual
  if (!date) {
    dateObj = new Date();
  } else {
    // Si la fecha es un número (timestamp), analizarla como timestamp en milisegundos
    if (/^\d+$/.test(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      // Intentar analizar la fecha como una cadena
      dateObj = new Date(date);
    }
  }

  // Validar si la fecha es válida
  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver el formato correcto de Unix y UTC
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString() // Formato de fecha en GMT
  });
});

module.exports = router;
