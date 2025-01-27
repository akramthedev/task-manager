"use client";
import React, { useState, useEffect, useRef } from 'react';
import './Tasks.css';
import Cookies from "js-cookie";




export default function Tasks() {

  const [Tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setshowPopupDelete] = useState(false);
  const TasksDone = Tasks.filter((task) => task.done).length;
  const popupRef = useRef(null);
  const popupRefCongrats = useRef(null);
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const refPopUpDeleted = useRef(null);
  const popupRefDetailsOfSingleTask = useRef(null);
  const [taskDetailsPopup, setTaskDetailsPopup] = useState({ show: false, task: null }); 
  const [filter, setFilter] = useState("");
  const [orderByDate, setOrderByDate] = useState("asc");
  const [newTask, setNewTask] = useState({
    done : false,
    title: "",
    tag: "",
    description: "",
    color: "backbluev",
    status: "todo",
    date : null
  });



  

  const filteredTasks = Tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) || 
      task.tag.toLowerCase().includes(filter.toLowerCase())
  );


  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return orderByDate === "asc" ? dateA - dateB : dateB - dateA;
  });


  const rehydrateTasks = () => {
    const savedTasks = Cookies.get("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };



  useEffect(() => {
    // Initial load
    rehydrateTasks();

    // Handle `bfcache` restores
    const handlePageShow = (event) => {
      if (event.persisted) {
        rehydrateTasks();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    // Cleanup listener
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    // Sync tasks to cookies whenever state changes
    if (Tasks.length > 0) {
      Cookies.set("tasks", JSON.stringify(Tasks), { expires: 365 });
    }
  }, [Tasks]);




  const toggleTaskDetailsPopup = (task) => {
    setTaskDetailsPopup({ show: !taskDetailsPopup.show, task });
  };

  const closeTaskDetailsPopup = () => {
    setTaskDetailsPopup({ show: false, task: null });
  };


  const togglePopup = () => {
    setShowPopup(!showPopup);

  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);


  const handleClickOutsideDetailsPopup = (event) => {
    if (popupRefDetailsOfSingleTask.current && !popupRefDetailsOfSingleTask.current.contains(event.target)) {
      closeTaskDetailsPopup();
    }
  };


  const handleCLickOutsideCOngratsPopUp = (event) => {
    if (popupRefCongrats.current && !popupRefCongrats.current.contains(event.target)) {
      setShowCongratsPopup(false);
    }
  };




 
  useEffect(() => {
    if (showCongratsPopup) {
      document.addEventListener('mousedown', handleCLickOutsideCOngratsPopUp);
    } else {
      document.removeEventListener('mousedown', handleCLickOutsideCOngratsPopUp);
    }
    return () => {
      document.removeEventListener('mousedown', handleCLickOutsideCOngratsPopUp);
    };
  }, [showCongratsPopup]);

  


  useEffect(() => {
    if (Tasks.length > 0 && TasksDone === Tasks.length) {
      setShowCongratsPopup(true);
      setTimeout(() => setShowCongratsPopup(false), 5000);  
    }
  }, [TasksDone, Tasks.length]);


  useEffect(() => {
    if (taskDetailsPopup.show) {
      document.addEventListener('mousedown', handleClickOutsideDetailsPopup);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideDetailsPopup);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDetailsPopup);
    };
  }, [taskDetailsPopup.show]);

  


  const handleClickOutsideTheDeletePopUp = (event) => {
    if (refPopUpDeleted.current && !refPopUpDeleted.current.contains(event.target)) {
      setshowPopupDelete(false);
    }
  };


  useEffect(() => {
    if (showPopupDelete) {
      document.addEventListener('mousedown', handleClickOutsideTheDeletePopUp);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideTheDeletePopUp);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTheDeletePopUp);
    };
  }, [showPopupDelete]);

  




  const toggleCheck = (taskId, statusTask) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );


    if(statusTask === "todo" || statusTask === "canceled" || statusTask === "pending"){
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "done" } : task
        )
      );
    }
    else{
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "todo" } : task
        )
      );
    }
  };


  const handleCreateTask = () => {
    if(newTask.title === "" || newTask.title === null){
      alert("Task title can't be empty.");
    }
    else{
      const newId = Tasks.length > 0 ? Tasks[Tasks.length - 1].id + 1 : 1;
      const taskToAdd = {
        id: newId,
        ...newTask,
        date: new Date().toISOString(), 
      };
      setTasks([...Tasks, taskToAdd]);  
      setShowPopup(false);  
      setNewTask({
        done: false,
        title: "",
        tag: "",
        description: "",
        color: "backbluev",
        status: "todo",
        date: null,  
      });  
    }
  };
  

  const deleteTask = (TAG, TITLE, COLOR, TASK) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(
        (task) => !(task.tag === TAG && task.title === TITLE && task.color === COLOR)
      );
      Cookies.set("tasks", JSON.stringify(updatedTasks), { expires: 365 });  
      return updatedTasks;
    });
    setTaskDetailsPopup({ show: !taskDetailsPopup.show, task : TASK });
  };


  const deleteAllTasksDefinitely = ()=>{
    setshowPopupDelete(false);    
    setTasks([]);
    Cookies.set("tasks", JSON.stringify([]), { expires: 365 });
  }
  

  return (
    <div className="task-table-container">
      <div className="task-filter">
        {
          Tasks.length >= 1 ?
          <>
            <h4>
              Tasks Done:&nbsp;&nbsp;{TasksDone} / {Tasks.length}
            </h4>
            <div 
              style={{
                display : "flex", 
                alignItems :"center", 
                justifyContent : "center"
              }}
            >
            
            <input
              type="text"
              placeholder="Filter tasks..."
              className="filter-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            &nbsp;&nbsp;&nbsp;
            <button
              className="sort-button"
              onClick={() => setOrderByDate((prev) => (prev === "asc" ? "desc" : "asc"))}
            >
              Order by: {orderByDate === "asc" ? "Oldest" : "Newest"}
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="view-button" onClick={togglePopup}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Create
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="view-button" onClick={()=>{setshowPopupDelete(true);}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gainsboro" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 mr-2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
              Delete 
            </button>
            </div>
          </>
          :
          <>
            <button  className="view-button222 view-button" onClick={togglePopup}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Launch A New Task
            </button>
          </>
        }
        
      </div>

     {
      Tasks.length === 0 ? 
      <div
        style={{
          height : "90px",
          width : "300px", 
          display :"flex", 
          alignItems : "center", 
          justifyContent : "center"
        }}
      >
        <p style={{color: "gray", fontSize : "0.9rem"}}>
        No Tasks yet...
      </p>
      </div>
      :
      <table className="task-table" style={{ width: "1000px" }} >
      <colgroup>
        <col style={{ width: "5%" }} /> 
        <col style={{ width: "10%" }} /> 
        <col style={{ width: "70%" }} /> 
        <col style={{ width: "10%" }} /> 
        <col style={{ width: "5%" }} /> 
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th>Task</th>
          <th>Title</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className={task.done === true ? "activatedRow" : ""} >
                <td>
                  <button
                    className={`esfouhsufhgoshdwg ${task.done ? "WhiteBackgroundActivated" : ""}`}
                    onClick={() => toggleCheck(task.id, task.status)}
                  >
                    {task.done && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#09090b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 "
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    )}
                  </button>
                </td>
                <td>TASK-{task.id}</td>
                <td>
                  {
                    task.tag.length >=1 && 
                    <>
                      <span
                        className={`task-type  ${getColorClass(task.color)}`}
                      >
                        {task.tag}
                      </span>
                      &nbsp;
                    </>
                  }
                  {task.title}
                </td>
                <td className='sfhgouhsgdhowd' >
                        {
                            task.status === "pending" ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer mr-2 h-4 w-4 text-muted-foreground"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></svg>
                            : task.status === "done" ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big mr-2 h-4 w-4 text-muted-foreground"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                            : task.status === "canceled" ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-off mr-2 h-4 w-4 text-muted-foreground"><path d="m2 2 20 20"></path><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"></path><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"></path></svg>
                            :
                            task.status === "todo" &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle mr-2 h-4 w-4 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle></svg>
                        }
                        &nbsp;&nbsp;
                  {task.status}</td>
                <td>
                  <button
                    className="MoreOptions"
                    onClick={() => toggleTaskDetailsPopup(task)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
    </table>
     }

{showPopup && (
        <div className="popup-container">
          <div className="popup" ref={popupRef}>
            <h2>New Task</h2>
            <input
              type="text"
              placeholder="Task Title..."
              className="popup-input"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Task Tag..."
              className="popup-input"
              value={newTask.tag}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, tag: e.target.value }))
              }
            />
            <textarea
              className="popup-textarea"
              placeholder="Task Description..."
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            ></textarea>
            <div className="color-palette">
              {["backbluev", "backyellow", "backblue", "backgreen", "backpink"].map((color) => (
                <div
                  key={color}
                  className={`color-circle ${color} ${newTask.color === color ? 'active' : ''}`}
                  onClick={() =>{
                    console.log("Color selected: "+color);
                    setNewTask((prev) => ({ ...prev, color : color }));
                    console.log("New Task Data : ");
                    console.log(newTask);
                  }}
                ></div>
              ))}
            </div>

            <button className="popup-button" onClick={handleCreateTask}>
              Create Task
            </button>
          </div>
        </div>
      )}




    {showCongratsPopup && 
        <div className="popup-container">
          <div className="popup popup2" ref={popupRefCongrats}>
            <div className="sfodfosnwodgnowodgno">
              <h4 style={{textAlign :"center"}} >🎉 Congratulations! 🎉</h4>
              <br />
              <p
                style={{
                  letterSpacing : "0.5px",
                  fontWeight:"400", 
                  fontSize : '0.9rem', 
                  textAlign : "center"
                }}
              >
                All tasks are completed!
              </p>
            </div>
          </div>
        </div>
      
      }




      {showPopupDelete && 
        <div className="popup-container">
          <div className="popup popup2" ref={refPopUpDeleted}>
            <div className="sfodfosnwodgnowodgno">
              <h4 style={{textAlign :"center"}} >This will delete all your tasks. Proceed?</h4>
              <br />
              <div className="sfowdodswfosdwx">
                <button
                  onClick={()=>{
                    setshowPopupDelete(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{
                    deleteAllTasksDefinitely();
                  }}
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      
      }

{taskDetailsPopup.show && (
  <div className="popup-container">
    <div className="popup popup2" ref={popupRefDetailsOfSingleTask}>
      <button className='buttonDelete'
        onClick={()=>{
          deleteTask(taskDetailsPopup.task.tag, taskDetailsPopup.task.title,taskDetailsPopup.task.color, taskDetailsPopup.task);
        }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="gainsboro" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 mr-2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
      </button>
      <div className="sfodfosnwodgnowodgno">
        <h2>{taskDetailsPopup.task.tag}:&nbsp;&nbsp;{taskDetailsPopup.task.title}</h2>
      </div>
      <p className="sfwgdjsiwdg">
      &nbsp;
      {taskDetailsPopup.task.description}</p>
      <div className="sfwdojsdwogjow2">
        {["todo", "pending", "canceled", "done"].map((status) => (
          <button
            key={status}
            
            className={`
              ${taskDetailsPopup.task.status === status ? "activatedStatus" : ""}
              ${
                taskDetailsPopup.task.status === status
                  ? taskDetailsPopup.task.color === "backyellow"
                    ? "borderYellow"
                    : taskDetailsPopup.task.color === "backbluev"
                    ? "borderBlueV"
                    : taskDetailsPopup.task.color === "backblue"
                    ? "borderBlue"
                    : taskDetailsPopup.task.color === "backgreen"
                    ? "borderGreen"
                    : taskDetailsPopup.task.color === "backpink"
                    ? "borderPink"
                    : ""
                  : ""
              }
            `}
            
            
            onClick={() => {
              setTasks((prevTasks) =>
                prevTasks.map((task) => {
                  if (task.id === taskDetailsPopup.task.id) {
                    return {
                      ...task,
                      status,
                      done: status === "done",  
                    };
                  }
                  return task;
                })
              );
            
              setTaskDetailsPopup((prev) => ({
                ...prev,
                task: { ...prev.task, status, done: status === "done" },
              }));
            }}
            
            

          >

            {status === "todo" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle mr-2 h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            )}
            {status === "pending" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-timer mr-2 h-4 w-4 text-muted-foreground"
              >
                <line x1="10" x2="14" y1="2" y2="2"></line>
                <line x1="12" x2="15" y1="14" y2="11"></line>
                <circle cx="12" cy="14" r="8"></circle>
              </svg>
            )}
            {status === "canceled" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-off mr-2 h-4 w-4 text-muted-foreground"
              >
                <path d="m2 2 20 20"></path>
                <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"></path>
                <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"></path>
              </svg>
            )}
            {status === "done" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-big mr-2 h-4 w-4 text-muted-foreground"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            )}
            &nbsp;{status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      

    </div>
  );
}

function getColorClass(color) {
  const colors = {
    backyellow: 'backyellow',
    backbluev: 'backbluev',
    backblue: 'backblue',
    backpink: 'backpink',
    backgreen: 'backgreen',
  };
  return colors[color] || '';
}
