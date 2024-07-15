import PopupWithForm from "./PopupWithForm";
import {useContext, useRef, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser?.avatar ?? "");
  const [error, setError] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const avatar = avatarRef.current.value;
    
    if (isValidURL(avatar)) {
      setError("");
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    } else {
      setError("URL invalida");
    }
  }
  
  return (
      <PopupWithForm
          id={"pop-up5"}
          name={"edit-avatar"}
          isOpen={isOpen}
          title={"Cambiar foto de perfil"}
          onClose={onClose}
      >
        <form className="form" id="form3" onSubmit={handleSubmit} noValidate>
          <input
              className="form__input"
              id="image-profile"
              type="url"
              placeholder="Enlace a la imagen"
              required
              name="link"
              ref={avatarRef}
          />
          {
            !!error &&
              <span className="form__input-span-error_active">{error}</span>
          }
          <button type="submit" className="button">Guardar</button>
        </form>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;