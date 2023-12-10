import React, { useState } from 'react';
import axios from "axios";
import { nameHost } from '../GlobalVariables';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from "react-router-dom";

import LoginForm from './LoginForm'

const LoginPanel = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({  
    email: "",
    password: ""
});

const handleChange = (event) => {
  setValues({
      ...values,
      [event.target.name]: event.target.value,

  })}

  const handleClearFormLogin = (event) => {
    setValues({
        email: "",
        password: ""

    })
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  if(values.email === "" || values.password ===""){
    toast.error('Pola są puste', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }else{
  const url = nameHost +'/users/login';
    axios.post(url , {
      email :    values.email,
      password : values.password
    } ).then(res => {
      if(res.data.message === "login correct"){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        navigate("/tasks");
        //window.location.reload();

        toast.success('Zalogowano pomyślnie', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }else {
        toast.error('Błąd podczas logowania', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          handleClearFormLogin();
    }
    }).catch(err => {
      console.error("Error from login endpoint", err)});

}}
  return (
    <>
   <LoginForm
        values={values}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
      />           
    </>
  )
}

export default LoginPanel