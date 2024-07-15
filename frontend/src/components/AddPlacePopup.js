import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const isLinkValid = isValidURL(link);
  const formIsValid = name.length > 2 && link.length > 2 && isLinkValid;
  
  function handleChange(evt) {
    if (evt.target.name === "name") {
      setName(evt.target.value);
    }else  {
      setLink(evt.target.value);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isLinkValid) {
      onAddPlace({
        name: name,
        link: link,
      });
    }
  }
  
  return(
      <PopupWithForm
          id={"pop-up2"}
          name={"new-place"}
          isOpen={isOpen}
          title={"Nuevo Lugar"}
          onClose={onClose}
      >
        <form className="form" id="form2" onSubmit={handleSubmit} noValidate>
          <input
              className="form__input"
              id="title"
              type="text"
              placeholder="Titulo"
              maxLength="30"
              minLength="2"
              required
              name="name"
              onChange={handleChange}
          />
          {
              name.length <= 2 &&
              <span className="form__input-span-error_active">El texto debe tener más de 2 caracteres</span>
          }
          <input
              className="form__input"
              id="image-link"
              type="url"
              placeholder="Enlace a la imagen"
              required
              name="link"
              onChange={handleChange}
          />
          {
              !isLinkValid &&
              <span className="form__input-span-error_active">URL invalida</span>
          }
          <button type="submit" className="button" disabled={!formIsValid}>Crear</button>
        </form>
      </PopupWithForm>
  )
}

export default AddPlacePopup;