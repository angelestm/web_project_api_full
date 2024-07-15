import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {


  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const formIsValid = name.length > 2 && description.length > 2;
  
  console.log("testing name, about", name, description)

// Después de cargar el usuario actual desde la API
// sus datos serán usados en componentes gestionados.

  useEffect(() => {
    console.log("testing current user", currentUser);
    // Reviso que el usuario en el contexto no sea `undefined`
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  function handleChange(evt) {
    if (evt.target.name === "name") {
      setName(evt.target.value);
    }else  {
      setDescription(evt.target.value);
    }
  }
  
  function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();
    
    // Limpiando los inputs
    setName("");
    setDescription("");
    
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  
  return (
      <PopupWithForm
          id={"pop-up1"}
          name={"edit-profile"}
          isOpen={isOpen}
          title={"Editar perfil"}
          onClose={onClose}
      >
        <form
            className="form"
            id="form1"
            noValidate
            onSubmit={handleSubmit}
        >
          <input
              className="form__input"
              id="user-name"
              type="text"
              placeholder="Nombre"
              maxLength="40"
              minLength="2"
              required
              name="name"
              onChange={handleChange}
              value={name}
          />
          {
            name.length <= 2 &&
              <span className="form__input-span-error_active">El texto debe tener más de 2 caracteres</span>
          }
          <input
              className="form__input" id="user-about"
              type="text"
              placeholder="Acerca de mí"
              maxLength="200"
              minLength="2"
              required
              name="about"
              onChange={handleChange}
              value={description}
          />
          {
            description.length <= 2 &&
              <span className="form__input-span-error_active">El texto debe tener mas de 2 caracteres</span>
          }
          <button type="submit" className="button" disabled={!formIsValid}>Guardar</button>
        </form>
      </PopupWithForm>
  )
}

export default EditProfilePopup;