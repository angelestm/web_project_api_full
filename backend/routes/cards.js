const express = require('express');
const fs = require('fs');
const path = require('path');
const {getAllCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");

const router = express.Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
