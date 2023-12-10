import React, { useState } from 'react';
import axios from "axios";
import { nameHost } from '../GlobalVariables';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

const RegistrationForm = () => {

  const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  const [values, setValues] = useState({
    email: "",
    passwordRegister: "",
    passwordRegisterConfirm: ""
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  const handleClearFormSignUp = (event) => {
    console.info("###CLEAR FORM SignUp PROCESS");
    setValues({
      email: "",
      passwordRegister: "",
      passwordRegisterConfirm: ""
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(values.email ==="" || values.passwordRegister === "" || values.passwordRegisterConfirm ===""){
      toast.error('Wszystkie pola musza byc wypelnione', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",})
        handleClearFormSignUp();
    }  
     
    else if(!emailValidator.test(values.email)){
      toast.error('Email ma niepoprawny format', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",})
    }
    else if((values.passwordRegister !== values.passwordRegisterConfirm)){
      toast.error('Hasła nie zgadzaja sie', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",})
        handleClearFormSignUp();
       
    }else{
    const url = nameHost + '/users/register';
    axios.post(url, {
      email: values.email,
      passwordRegister: values.passwordRegister,
      passwordRegisterConfirm: values.passwordRegisterConfirm
    })
      .then(res => { 
        handleClearFormSignUp();
        
       if (res.data.message === 'success') {
          toast.success('Konto zostało stworzone', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        } else if (res.data.message === 'email already exists') {
          toast.error('Konto z takim emailem już isniteje', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

             })
      .catch(res => console.log(res));
  }}

  return (
    <div className="container">
      <h1>Tworzenie konta</h1>
      <form onSubmit={handleClearFormSignUp}>
        <h3>Podaj dane</h3>
        <div className="mb-3">
          <label htmlFor="inputUserName" className="form-label">Email</label>
          <input
            type="text"
            id="inputUserName"
            name="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Hasło</label>
          <input
            type="password"
            id="inputPassword"
            name="passwordRegister"
            className="form-control"
            placeholder="Password"
            required
            value={values.passwordRegister}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputConfirmPassword" className="form-label">Potwierdź hasło</label>
          <input
            type="password"
            id="inputConfirmPassword"
            name="passwordRegisterConfirm"
            className="form-control"
            placeholder="Confirm Password"
            required
            value={values.passwordRegisterConfirm}
            onChange={handleChange}
          />
        </div>
        <button
          name="register"
          type="submit"
          onClick={handleFormSubmit}
          className="btn btn-primary"
        >
          Zarejestruj się
        </button>
        <br />
        <Link to="/login" className="btn btn-link" name="login" type="submit">Logowanie</Link>
      </form>
    </div>
  )
}

export default RegistrationForm;
