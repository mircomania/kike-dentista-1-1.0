require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const submitRoutes = require('./routes/submit');
const bannerRoutes = require('./routes/banner');
const cursosRoutes = require('./routes/cursos');

app.use('/api', submitRoutes);
app.use('/api', bannerRoutes);
app.use('/api', cursosRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
