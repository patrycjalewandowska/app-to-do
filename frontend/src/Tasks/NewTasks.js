import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import handleIsToken from '../handleIsToken';
import { useNavigate } from "react-router-dom";

const NewTasks = props => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setshowForm] = useState(false);
  const navigate = useNavigate();


  const setTitleHandler = event => {
    const value = event.target.value;
    setTitle(value);

  }

  const setDescriptionHandler = event => {
    const value = event.target.value;
    setDescription(value);

  }

  const addTask = () => {
    const task ={
      title : title,
      description : description
    }
    if(!handleIsToken()){
      toast.error('Brak dostępu', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        hideForm();
        navigate("/login");
        
    }
    else if(title ==="" || description ===""){
      toast.error('Zadanie nie może być', {
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
    else if(title === "" || description === ""){
      toast.error('Zadanie nie może być puste', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        hideForm();
    }
   
    else{
    props.onAdd(task);
    setTitle("");
    setDescription("");
    hideForm();}
  }

 const hideForm = () => {
  setshowForm(false);
 }

  return (
    showForm ? (
      <div className="container mt-4">
      <label htmlFor="titleTask" className="form-label">Tytuł:</label>
      <input
        type="text"
        id="titleTask"
        name="titleTask"
        className="form-control"
        value={title}
        onChange={setTitleHandler}
      />
      <br />
      <label htmlFor="descriptionTask" className="form-label">Opis:</label>
      <input
        type="text"
        id="descriptionTask"
        name="descriptionTask"
        className="form-control"
        value={description}
        onChange={setDescriptionHandler}
      />
      <button className="btn btn-primary mt-3" onClick={addTask}>
        Dodaj notatkę
      </button>
      <button type="button" className="btn btn-secondary mt-3" onClick={hideForm}>
        Anuluj
      </button>

    </div>)
        :
        (
          <button type="button" className="btn btn-primary" onClick={() => setshowForm(true)}>
        Dodaj notatkę
      </button>
        )
  )
}

export default NewTasks