const express = require('express');
const router = express.Router();

// Ruta para manejar fechas con o sin parámetro
router.get('/:date?', (req, res) => {
  const { date } = req.params;
  let dateObj;

  // Si no se proporciona una fecha, se usa la fecha actual
  if (!date) {
    dateObj = new Date();
  } else {
    // Si la fecha es un número, analizarla como timestamp en milisegundos
    if (!isNaN(date)) {
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
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString() // Formato de fecha en GMT
  });
});

module.exports = router;
