const express = require('express');
const router = express.Router();

// Ruta para manejar fechas con o sin parámetro
router.get('/:date?', (req, res) => {
  let { date } = req.params;
  let dateObj;

  // Si no se proporciona fecha, usar la fecha actual
  if (!date) {
    dateObj = new Date();
  } else {
    // Ver si la fecha es un timestamp en milisegundos (solo números)
    if (/^\d+$/.test(date)) {
      dateObj = new Date(parseInt(date));  // Parsear la fecha como timestamp
    } else {
      // Parsear la fecha como una cadena en formato ISO
      dateObj = new Date(date);
    }
  }

  // Validar si la fecha es válida
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta JSON con formato UNIX y UTC
  return res.json({
    unix: dateObj.getTime(),  // Milisegundos desde el 1 de enero de 1970
    utc: dateObj.toUTCString()  // Fecha en formato UTC
  });
});

module.exports = router;
