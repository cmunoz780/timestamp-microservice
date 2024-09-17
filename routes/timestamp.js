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
    // Ver si la fecha es un timestamp en milisegundos (solo números)
    if (!isNaN(date)) {
      // Ver si la fecha es un timestamp numérico
      dateObj = new Date(parseInt(date));
    } else {
      // Intentar parsear la fecha como cadena
      dateObj = new Date(date);
    }
  }

  // Validar si la fecha es válida
  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta JSON con formato UNIX y UTC
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

module.exports = router;
