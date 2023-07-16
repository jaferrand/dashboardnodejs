const express = require('express');
const app = express();
const port = 3000;
const fetch = import('node-fetch').default;
const Chart = require('chart.js');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configurar la carpeta "public"
app.use(express.static('public'));

// Definir las rutas
app.get('/', async (req, res) => {
  try {
    const data = await fetchData(); // Función para obtener los datos de la API
    res.render('dashboard', { data });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está funcionando en http://localhost:${port}`);
});

// Función para obtener los datos de la API externa
async function fetchData() {
}try {
    const apiKey = "dee2a38f8fe949ea5172402d";
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    if (!response.ok) {
    throw new Error('Error al obtener los datos de la API');
    }
    const data = await response.json();
    const processedData = processData(data);
    return processedData;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los datos de la API');
}
}

function processData(data) {
  // Aquí puedes realizar el procesamiento de los datos según la estructura de la API y tus necesidades
  // Por ejemplo, puedes acceder a los tipos de cambio y realizar cualquier manipulación necesaria
  const rates = data.conversion_rates;
  const processedData = {
    EUR: rates.EUR,
    GBP: rates.GBP,
    JPY: rates.JPY,
    // Agrega otros tipos de cambio que desees utilizar en tu dashboard
  };
  return processedData;
}