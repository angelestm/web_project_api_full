import editButton from "../images/EditButton.png"
import addButton from "../images/AddButton.png"
import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from "./Header";
import {Link} from "react-router-dom";

function Main(
    {
      onEditAvatarClick,
      onEditProfileClick,
      onAddPlaceClick,
      onCardClick,
      cards,
      children,
      onCardDelete,
      onCardLike
    }
) {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
        <main>
          <section className="profile">
            <div className="profile__photo-overlay"
                 onClick={onEditAvatarClick}
            ></div>
            <img
                id="profilePhoto"
                alt="profile"
                className="profile__photo"
                style={{ backgroundImage: `url(${currentUser?.avatar})` }}
            />
            <div className="profile__info">
              <h2 className="profile__name">{currentUser?.name}</h2>
              <h2 className="profile__description">{currentUser?.about}</h2>
              <img id="editButton" alt="Edit-Button" className="profile__edit-button" src={editButton}
                   onClick={onEditProfileClick}
              />
            </div>
            <div className="profile__add-button-container" onClick={onAddPlaceClick}>
              <img id="addButton" alt="Add-Button" className="profile__add-button" src={addButton}/>
            </div>
          </section>
          <section className="elements">
            {
              cards.map((card, index) => (
                  <Card
                      key={`card-id-${index}`}
                      card={card}
                      id={`card-id-${index}`}
                      onCardClick={onCardClick}
                      onCardDelete={onCardDelete}
                      onCardLike={onCardLike}
                  />
              ))
            }
          </section>
          
          {children}
          
          {/* Pop up Are you sure? */}
          <div className="pop-up" id="pop-up4">
            <div className="pop-up__delete-container">
              <img alt="Icono de cerrar" className="pop-up__close-button pop-up__close" id="close-button4"/>
              <h2 className="pop-up__delete-title">¿Estás seguro?</h2>
              <button type="submit" className="button">Sí</button>
            </div>
          </div>
        </main>
  );
}

export default Main;
