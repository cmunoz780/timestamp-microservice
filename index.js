// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Servir archivos estáticos en la carpeta "public" (si hubiera algún archivo allí)
app.use(express.static('public'));

// Ruta principal, devolverá el archivo HTML en /views/index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Primera API, simple para probar conexión
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Importar las rutas desde el archivo timestamp.js
const timestampRoutes = require('./routes/timestamp');

// Usar las rutas de la API para el servicio de timestamp
app.use('/api', timestampRoutes);

// Escuchar en el puerto 3000 o en el puerto configurado en el entorno
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
