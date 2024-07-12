const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30
  },
  link: {
    type:String,
    require: true,
    validate: {
      validator: function(value) {
        return /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#].*)?$/.test(value);
      },
      message: props => `${props.value} no es un enlace URL válido para la imagen.`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);