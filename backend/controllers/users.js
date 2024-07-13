const bcrypt = require('bcrypt');
const User = require('../models/user');
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.getAllUsers = (req, res) => {
  User.find()
    .orFail()
    .then((users) => res.send(users))
    .catch((error) => res.status(ERROR_CODE).json({ message: error.message }));
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((error) => res.status(error.statusCode || ERROR_CODE).json({ message: error.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error(" El email ya se encuentra registrado");
      } else {
        return bcrypt.hash(req.body.password, 10);
      }
    })

    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash });
    })

    .then((user) => {
      res.send({ data: user });
    })

    .catch((error) => {
      res.status(ERROR_CODE).json({ message: error.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      console.log(`Error ${error.name} con el mensaje ${error.message} ocurrió durante la ejecución del código, pero lo hemos manejado`);
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(error.statusCode || ERROR_CODE).json({ message: error.message }));
};

// Controlador para el login
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch(next);
};

// Controlador para obtener la información del usuario actual
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: 'Error interno del servidor' }));
};

