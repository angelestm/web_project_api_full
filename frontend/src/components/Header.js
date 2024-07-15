import logo from "../images/logo.png";

function Header({children}) {
  return (
      <header className="header">
        <img id="logo" alt="logo" className="logo" src={logo} />
        <div className="header__subheader">
          {children}
        </div>
      </header>
  );
}

export default Header;