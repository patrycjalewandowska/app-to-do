import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Task = props => {

 const editHandler = () => {

  props.onEdit({
    title: props.title,
    description: props.description,
    _id: props.id

  })
 }
    
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <button className="btn btn-primary" onClick={editHandler}>
          Edytuj
        </button>
        <button className="btn btn-danger" onClick={() => props.onDelete(props.id)}>
          Usuń
        </button>
      </div>
    </div>
  )
}

export default Task