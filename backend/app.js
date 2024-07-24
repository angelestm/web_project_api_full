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

// detecta el puerto 3000
const {PORT = 3000} = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => {
  console.log('Conexión a MongoDB establecida con éxito');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err.message);
});


// Configurar CORS con opciones
const allowedOrigins = ['http://localhost:3000', 'https://api.aroundweb.robonauts.net'];
// inclúyelos antes de otras rutas
const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes con origen undefined (p. ej., aplicaciones móviles)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy para este sitio no permite acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow credentials if needed
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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