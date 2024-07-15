import trashCan from "../images/trash-can.png";
import likeButton from "../images/LikeButton.png";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Card ({card, id, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner._id === currentUser._id;

// Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = (
      `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );
  
  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some(i => i._id === currentUser._id);

// Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `element__like-button  ${
      isLiked ? "element__like-button_active" : ""
  }`;
  
  const handleOnClick = () => {
    onCardClick(card);
  }
  
  const handleOnLikeClick = () => {
    onCardLike(card)
  }
  
  const handleOnCardDelete = () => {
    onCardDelete(card)
  }
  
  return (
      <div className="card">
        <div className="element" id={id}>
          <img id="deleteButton" alt="Delete-Button" className={cardDeleteButtonClassName}
               src={trashCan}
               onClick={handleOnCardDelete}
          />
          <img
              src={card.link}
              alt={`Foto de ${card.name}`}
              className="element__image"
              onClick={handleOnClick}
          />
          <div className="element__content"><p className="element__description">{card.name}</p>
            <div>
              <img
                  id="likeButton"
                  alt="Like-Button"
                  className={cardLikeButtonClassName}
                  src={likeButton}
                  onClick={handleOnLikeClick}
              />
              <p className="element__like-count">{card?.likes?.length || "" }</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Card;