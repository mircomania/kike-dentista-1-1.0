require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

// Configura middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.AIRTABLE_BASE_ID);
console.log(process.env.AIRTABLE_TABLE_NAME);
console.log(process.env.AIRTABLE_API_KEY?.slice(0, 5));

// Ruta para manejar el envío de datos y archivo
app.post('/submit', async (req, res) => {
    const { nombre, telefono, email, comentario } = req.body;

    try {
        // Guardar los datos en Airtable
        const response = await axios.post(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
            {
                fields: {
                    name: nombre,
                    phone: telefono,
                    email: email,
                    comments: comentario,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ message: 'Datos enviados correctamente.' });
    } catch (error) {
        console.error('Airtable error:', error.response?.data || error.message);

        res.status(500).json({
            message: 'Error Airtable',
            error: error.response?.data || error.message,
        });
    }
});

// Configurar el servidor para escuchar en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
