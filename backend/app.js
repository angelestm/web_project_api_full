const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const usersController = require('./controllers/users');
const cards = require('./routes/cards');
const bodyParser = require('body-parser');


const { createUser, login } = require('./controllers/users');
const {jwtMiddleware} = require("./middlewares/auth");
const {requestLogger, errorLogger} = require("./middlewares/logger");
const {errors} = require("celebrate");
const cors = require('cors');
const app = express();

// Configurar CORS con opciones
const corsOptions = {
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Permitir estos métodos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
  credentials: true
};
app.use(cors(corsOptions));

// detecta el puerto 3000
const {PORT = 3000} = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => {
  console.log('Conexión a MongoDB establecida con éxito');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err.message);
});

app.use(requestLogger);
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.use(jwtMiddleware);


app.use('/cards', cards);
app.use('/users', users);

app.use(errorLogger);

app.use(errors());

app.use((req, res) => {
  res.status(404).json({message: 'Recurso solicitado no encontrado'});
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})