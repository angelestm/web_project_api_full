import Header from "./Header";
import {Link, useNavigate} from "react-router-dom";
import UserForm from "./UserForm";
import {useState} from "react";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth";

function Register() {
  const navigate = useNavigate();
  
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  
  const [successRegister, setSuccessRegister] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  function onCloseInfoTool() {
    setIsInfoOpen(false);
  }
  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();
    auth
        .register(userCredentials.email, userCredentials.password)
        .then((data) => {
          if (data) {
            setIsInfoOpen(true);
            setSuccessRegister(true);
            
            setTimeout(() => {
              navigate('../signin', { state: 'success' });
            }, 1000)
            
          } else {
            setIsInfoOpen(true);
            setSuccessRegister(false);
          }
        });
  }
  
  return (
      <>
        <Header>
          <Link to='/signin' className='header__sign'>
            {' '}
            Iniciar Sesión
          </Link>
        </Header>
        <UserForm
            title={"Regístrate"}
            buttonText={"Regístrate"}
            linkSpan={"../signin"}
            linkText={"¿Ya eres miembro? Iniciar sesión aquí"}
            onSubmit={handleSubmit}
        >
          <input
              className="userForm__input"
              placeholder="Correo electrónico"
              type="email"
              name="email"
              minLength="8"
              maxLength="30"
              onChange={handleChange}
              required
          />
          <input
              className="userForm__input"
              placeholder="Contraseña"
              type="password"
              name="password"
              minLength="8"
              maxLength="30"
              onChange={handleChange}
              required
          />
        </UserForm>
        <InfoToolTip
            isSuccess={successRegister}
            isInfoOpen={isInfoOpen}
            onCloseBtn={onCloseInfoTool}
        >
        </InfoToolTip>
      </>
  );
}
  export default Register;