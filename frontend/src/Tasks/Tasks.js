import React, { useState, useEffect  } from 'react';
import Modal from 'react-modal';
import Task from './Task';
import { nameHost } from '../GlobalVariables';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTasks from './NewTasks';
import EditTask from './EditTask';
import { useNavigate } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import handleIsToken from '../handleIsToken';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [editToTask, seteditToTask] = useState({});





    const navigate = useNavigate();

    useEffect(()=>{
        
        fetchTasks();
    },  [refresh]);

    const token = localStorage.getItem("token");
    const fetchTasks =  async () => {
       await axios.get(nameHost + '/tasks').then(res => {
            
            if (res.data.message === "success"){
                setTasks(res.data.info);                
            }
            else
            {
                setTasks([]);
            }
        }).catch(error => {
            console.error("Błąd pobierania danych:", error);
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");

        toast.success('Wylogowano pomyślnie', {
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
    

 const deleteTask =  async (id) => {

    await  axios.delete(nameHost + '/tasks/' + id,{
        headers: {
           Authorization: 'Bearer ' + token
      }
  
}).then(res => {        
        if (res.data.message === "success"){
            setRefresh(prevState => !prevState)
            toast.success('Zadanie zostało usunięte', {
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
    }).catch(error => {
        console.error("Błąd usunięcia zadania:", error);
    });
 }


 const addNote =  async (task) => {
    await axios.post(nameHost +'/tasks', task, {
        headers: {
           Authorization: 'Bearer ' + token
      }
  
}).then(res => {
        if(res.data.message === "success"){

          setRefresh(prevState => !prevState) 

            toast.success('Zadanie zostało dodane', {
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
    }).catch(error => {
        console.error("Bląd dodania zadania", error);
    });}

    const editTask = async (task) => {

        if(task.title === "" || task.description === "" ){

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
        }else{
        
        await axios.put(nameHost + '/tasks/' + task._id, task, {
            headers: {
               Authorization: 'Bearer ' + token
          }
    }).then(res => {
            console.log(res.data);
            if(res.data.message === "success"){

                toast.success('Zadanie zostało zapisane', {
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
        }).catch(error => {
            console.error("Błąd edycji zadania:", error);
        });

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(prevTask =>
              prevTask._id === task._id ? task : prevTask
            );
            return updatedTasks;
          });
   

        showEditModalTask();
    }}

    const showEditModalTask = () => {
        setshowEditModal(!showEditModal);
    }

   const editNoteHandler = (task) => {
        showEditModalTask();
        seteditToTask(task) ;
      }


  return (
    <div>
       {handleIsToken() ? (
         <div className="container mt-4">
         <button className="btn btn-danger" onClick={logout}>
           Wyloguj mnie
         </button>
        
        <NewTasks onAdd={(task) => addNote(task)}/>

        <Modal 
        isOpen={showEditModal}
        contentLabel = "Edytuj zadanie"
        ariaHideApp={false}>
        
       <EditTask
        title={editToTask.title}        
        description={editToTask.description}
        id={editToTask._id}
        onEdit={task => editTask(task)
         }/>
        <button type="button" className="btn btn-secondary" onClick={() => showEditModalTask()}>
        Anuluj
      </button>
        </Modal>
        <p className="h4 mt-3">Notatki grupowe:</p>
        {tasks.map(task => {
           return(
            <Task 
            key = {task._id}
            title={task.title}
            description={task.description}
            id ={task._id}
            onEdit={(task) => editNoteHandler(task)}
            onDelete={(id) => deleteTask(id)} 
            />
       
           ) 
        })}
       
        </div>): (
            <ErrorPage/>
        )}
    </div>
  )
}

export default Tasks;