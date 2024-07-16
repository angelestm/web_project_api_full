const mongoose  = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
    default: "Explorador"
  },
  avatar: {
    type: String,
    require: true,
    default:
      "https://plus.unsplash.com/premium_photo-1705091981835-2d49de67d994?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validate: {
      validator: function(value) {
        return /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#].*)?$/.test(value);
      },
      message: props => `${props.value} no es un enlace URL válido para el avatar.`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => {
        return `${props.value} no es un email valido.`;
      },
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  }
  });

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Error("El usuario o contraseña son incorrectos")
        );
      } else {
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new Error("El usuario o contraseña son incorrectos")
            );
          } else {
            return user;
          }
        });
      }
    })

    .catch((error) => {
      return Promise.reject(
        new Error("El usuario o contraseña son incorrectos")
      );
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;