import iconSuccess from "../images/iconSuccess.png";
import iconError from "../images/iconError.png";
import closeButton from "../images/CloseIcon.png";
function InfoToolTip({isSuccess, isInfoOpen, onCloseBtn}) {
  const icon = isSuccess ? iconSuccess : iconError;
  const message = isSuccess
      ? '¡Correcto! Ya estás registrado.'
      : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';
  
  return (
      <div className={`pop-up ${isInfoOpen ? 'popup_opened' : ''}`}>
        <div className="infoTool">
          <img className="infoTool__image" src={icon} alt="icono que muestra el estado del registro"/>
          <p className="infoTool__text">{message}</p>
          <img
              alt="Icono de cerrar"
              className="pop-up__close-button pop-up__close" id="close-button1"
              src={closeButton}
              onClick={onCloseBtn}
          />
        </div>
      </div>
  )
}

export default InfoToolTip;