import closeButton from "../images/CloseIcon.png";

function PopupWithForm({name, title, id, children, isOpen, onClose}) {
  return (
      <div id={id}
           className={`pop-up popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="pop-up__container">
          <img
              alt="Icono de cerrar"
              className="pop-up__close-button pop-up__close" id="close-button1"
              src={closeButton}
              onClick={onClose}
          />
          <h2 className="pop-up__title">{title}</h2>
          {children}
        </div>
      </div>
  );
  
}

export default PopupWithForm;