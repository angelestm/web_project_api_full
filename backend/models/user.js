const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30
  },
  about: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30
  },
  avatar: {
    type: String,
    require: true,
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
      validator: (v) => isEmail(v),
      message: 'Email inválido',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  });

module.exports = mongoose.model('user', userSchema);