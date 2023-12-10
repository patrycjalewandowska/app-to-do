import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom'; 



const LoginForm = ({ values, handleChange, handleFormSubmit }) => {

  return (

    <>
        <div className="container">
    <h1>Zaloguj się</h1>
    <form>
      <h3>Podaj dane</h3>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="text"
          id="inputEmail"
          name="email"
          className="form-control"
          placeholder="email"
          required
          autoFocus
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Hasło</label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="hasło"
          required
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleFormSubmit}
        name="login"
        type="submit"
      >
        Zaloguj mnie
      </button>
      <br />
      <Link to="/register" className="btn btn-link" name="register">
        Tworzenie konta
      </Link>
    </form>
  </div>
  </>
  )
}


export default LoginForm;