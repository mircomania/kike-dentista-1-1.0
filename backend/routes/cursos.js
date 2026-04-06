const express = require('express');
const router = express.Router();

const { getCursos } = require('../controllers/cursosController');

router.get('/cursos', getCursos);

module.exports = router;
