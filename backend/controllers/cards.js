const Card = require('../models/card');

const ERROR_CODE = 400;

// Obtener todas las tarjetas
module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(ERROR_CODE).json({message: error.message});
  }
};

// Crear una nueva tarjeta
module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    const newCard = new Card({ name, link, owner: ownerId });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(ERROR_CODE).json({ message: error.message });
  }
};

// Eliminar una tarjeta por su ID
module.exports.deleteCard = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (deletedCard) {
      res.json({ message: 'Tarjeta eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Tarjeta no encontrada' });
    }
  } catch (error) {
    res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      console.log("ID de tarjeta no encontrado");
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}}, // elimina _id del array
    {new: true},
  )
    .then((card) => res.send(card))
    .catch((error) => {
      res.status(error.statusCode || ERROR_CODE).json({message: error.message});
    });
};