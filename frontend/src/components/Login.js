import {useEffect, useState} from "react";
import Header from "./Header";
import UserForm from "./UserForm";
import {Link, useLocation, useNavigate} from "react-router-dom";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth";

function Login({onLogin}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const [successRegister, setSuccessRegister] = useState(location.state === 'success');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  useEffect(() => {
    if (successRegister) setIsInfoOpen(false);
  }, [successRegister]);
  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserCredentials(prevState => ({ ...prevState, [name]: value }));
  }
  
  function handleSubmit(evt){
    evt.preventDefault();
    if (!userCredentials.email || !userCredentials.password) return;
    onLogin(userCredentials.email, userCredentials.password);
  }
  
  const onCloseInfoTool = () => setIsInfoOpen(false);
  
  return (
    <>
      <Header>
        <Link to="/signup" className="header__sign" >
          {' '}
          Registrate
        </Link>
      </Header>
      <UserForm
          title={"Inicia sesión"}
          buttonText={"Inicia sesión"}
          linkSpan={"../signup"}
          linkText={"¿Aún no eres miembro? Regístrate aquí"}
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
            value={userCredentials.email}
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
            value={userCredentials.password}
            required
        />
      </UserForm>
      {/*<InfoToolTip*/}
      {/*    isSuccess={successRegister}*/}
      {/*    isInfoOpen={isInfoOpen}*/}
      {/*    onCloseBtn={onCloseInfoTool}*/}
      {/*></InfoToolTip>*/}
    </>
  )
}

export default Login;