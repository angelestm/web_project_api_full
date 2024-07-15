import {Link} from "react-router-dom";

function UserForm({
    title, buttonText, linkText, onSubmit, linkSpan, children
    }) {
  return (
      <form className="userForm" onSubmit={onSubmit}>
        <h3 className="userForm__title">{title}</h3>
        <div className="userForm__container">
          {children}
        </div>
        <button
            className="userForm__button"
            type="submit"
            onSubmit={onSubmit}>{buttonText}</button>
        <Link to={linkSpan} className="userForm__link">{linkText}</Link>
      </form>
  )
}

export default UserForm;