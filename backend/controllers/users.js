const bcrypt = require('bcrypt');
const User = require('../models/user');
const {contentDisposition} = require("express/lib/utils");

const ERROR_CODE = 400;

module.exports.getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.send(users);
  })
    .catch((error) => {
    res.status(ERROR_CODE).json({ message: error.message });
  });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
    res.send(user);
  })
    .catch((error) => {
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message })
    });
};

module.exports.createUser = async (req, res) => {
  const {name, about, avatar} = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(ERROR_CODE).json({ message: error.message });
  }
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
      console.log(
        `Error ${error.name} con el mensaje ${error.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
    });
};

