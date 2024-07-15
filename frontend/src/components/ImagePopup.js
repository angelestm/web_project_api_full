import closeButton from "../images/CloseIcon.png";

function ImagePopup({title, image, isOpen, onClose}) {
  return (
      <div
          id="pop-up3"
          className={`pop-up ${isOpen ? 'popup_opened' : ''}`}
      >
        <div className={"zoom-pop-up__container"}>
          <img id="image-popUp" className="zoom-pop-up__image"
               alt="images" src={image}/>
          <img
              alt="Icono de cerrar"
              className="zoom-pop-up__close-button pop-up__close"
              id="close-button3"
              src={closeButton}
              onClick={onClose}
          />
          <h2 id="popUP-img-title" className="zoom-pop-up__title">
            {title}
          </h2>
        </div>
      </div>  
  );
}

export default ImagePopup;