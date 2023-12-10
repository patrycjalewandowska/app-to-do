import React from "react";
import{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import handleIsToken from "../handleIsToken";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const EditTask = props =>{


    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const navigate = useNavigate();


    const setTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    
      }
    
      const setDescriptionHandler = event => {
        const value = event.target.value;
        setDescription(value);
    
      }

      const editTask = () => {
        const task ={
            title : title,
            description : description,
            _id: props.id
          }

          if(!handleIsToken()){
            navigate("/login");
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
    
          }else{
            props.onEdit(task);
          }
         
       
      }

    return(
      <>
      <div className="form-group">
        <p>Zadanie dodane przez:</p>
        <label htmlFor="titleTask">Tytuł:</label>
        <input
          type="text"
          id="titleTask"
          name="titleTask"
          className="form-control"
          value={title}
          onChange={setTitleHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionTask">Opis:</label>
        <input
          type="text"
          id="descriptionTask"
          name="descriptionTask"
          className="form-control"
          value={description}
          onChange={setDescriptionHandler}
        />
      </div>
      <button className="btn btn-primary" onClick={() => editTask()}>
        Zapisz notatkę
      </button>
    </>

    )
}

export default EditTask