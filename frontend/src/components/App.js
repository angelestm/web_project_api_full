import Footer from "./Footer";
import "../index.css";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as auth from '../utils/auth';
import {logOut} from '../utils/auth';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    api.getURL("/cards").then((cards) => {
      setCards(cards);
    });
  }, []);
  
  useEffect(() => {
    function handleKeyDown (event) {
      if (event.key === "Escape") {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo();
      validateAuth(token);
    } else {
      navigate("/signin");
    }
  }, []);
  
  const getUserInfo = () => {
    api.getURL("/users/me").then((userInfo) => {
      setCurrentUser(userInfo.data);
    });
  };
  
  const validateAuth = (token) => {
    auth
        .getToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
            
            navigate('/');
          } else {
            navigate('/signup');
            throw new Error('Token inválido');
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/signup');
        });
  }
  
  function handleLogin(email, password){
    auth.authorize(email, password).then(({token}) => {
      localStorage.setItem("token", token);
      getUserInfo();
      validateAuth(token);
    })
  }
  
  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some(userId => userId === currentUser._id);
    
    if (isLiked) {
      api
          .deleteURL(`/cards/${card._id}/likes`)
          .then((newCard => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          }));
    } else {
      api
          .updateURL("PUT", `/cards/${card._id}/likes`)
          .then((newCard => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          }));
    }
  }
  
  function handleCardDelete(card) {
    api.deleteURL(`/cards/${card._id}`)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id)
          setCards(newCards);
        })
  }
  
  function handleAddPlaceSubmit(card) {
    api.updateURL("POST", "/cards", card)
        .then((newCard => {
          setCards([newCard, ...cards]);
          setIsAddPlacePopupOpen(false);
        }))
  }
  
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleUpdateUser(data) {
    api.updateURL("PATCH",
        "/users/me",
        data
    ).then(() => {
      setCurrentUser({
        ...currentUser,
        ...data,
      });
      setIsEditProfilePopupOpen(false);
    })
  }
  
  function handleUpdateAvatar(data) {
    api.updateURL("PATCH", "/users/me/avatar", data)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsEditAvatarPopupOpen(false);
        })
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  
  return (
      <div className="root">
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
              <Routes>
                <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/signup" element={<Register />}/>
                <Route path="/" element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <>
                      <Header>
                        <Link to="/signin" className="header__sign" onClick={logOut}>
                          {' '}
                          Cerrar sesión
                        </Link>
                        <p className='header__sign'>{email}</p>
                      </Header>
                      <Main
                          onEditAvatarClick={handleEditAvatarClick}
                          onEditProfileClick={handleEditProfileClick}
                          onAddPlaceClick={handleAddPlaceClick}
                          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                          isAddPlacePopupOpen={isAddPlacePopupOpen}
                          isEditProfilePopupOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onCardClick={handleCardClick}
                          selectedCard={selectedCard}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}
                      >
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}/>
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                        <ImagePopup
                            title={selectedCard?.name || ""}
                            image={selectedCard?.link || ""}
                            isOpen={!!selectedCard}
                            onClose={closeAllPopups}
                        />
                      </Main>
                    </>
                  </ProtectedRoute>
                }/>
              </Routes>
              <Footer />
          </CurrentUserContext.Provider>
        </div>
      </div>
  );
}

export default App;
