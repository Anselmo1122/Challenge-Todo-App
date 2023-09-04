import './App.css'
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

function App() {

  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [path, setPath] = useState("ALL");

  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState({});

  const todoRef = useRef(null);

  useEffect(() => {
    if(todos.length > 0) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  // useEffect(() => {
  //   const data = localStorage.getItem("todos");
  //   setTodos(JSON.parse(data));
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoRef.current.value === "") return;
    setTodos((todos) => {
      const newTodos = [{
        id: uuidv4(),
        title: todo,
        completed: false,
      }, ...todos];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    })
    todoRef.current.value = "";
  }

  const handleChange = (e) => {
    setTodo(e.currentTarget.value);
  }

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      todo.completed = !todo.completed;
      return todo;
    })
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const deleteAllTodo = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  }

  return (
    <div className="todo-app d-flex flex-column justify-content-center align-items-center my-5">
      <header className='header'>
        <h1 className='header__title'>#todo</h1>
      </header>
      <main className="todo-list d-flex flex-column align-items-center gap-4">

        <ul className="nav nav-underline d-flex justify-content-between px-3 gap-4 flex-nowrap text-center">
          <li className="nav-item">
            <a className={path == "ALL" ? "nav-link active" : "nav-link"} href="#" onClick={() => setPath("ALL")}>All</a>
          </li>
          <li className="nav-item">
            <a className={path == "ACTIVE" ? "nav-link active" : "nav-link"} href="#" onClick={() => setPath("ACTIVE")}>Active</a>
          </li>
          <li className="nav-item">
            <a className={path == "COMPLETED" ? "nav-link active" : "nav-link"} href="#" onClick={() => setPath("COMPLETED")}>Completed</a>
          </li>
        </ul>

        <form className="form-add container-fluid row" onSubmit={handleSubmit}>
          <div className="col-10 input-add">
            <label htmlFor="inputAddDetails" className="visually-hidden">details</label>
            <input
              type="text" 
              className="form-control"
              id="inputAddDetails" 
              ref={todoRef} 
              placeholder="add details"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="col-2 button-add">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>

        <div className="container-fluid p-0">
          {
            path === "ALL" && (
              <ul className='todos'>
                {
                  todos.map((todo) => {
                    return(
                      <li key={ todo.id } className="py-2">
                        <div className="form-check">
                            {
                              todo.completed 
                                ? <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} defaultChecked onChange={() => completeTodo(todo.id)}/>
                                : <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} onChange={() => completeTodo(todo.id)}/>
                            }
                            <label 
                              className={todo.completed ? "form-check-label text-decoration-line-through" : "form-check-label"} 
                              htmlFor={`check${todo.id}`}
                            >
                              { todo.title }
                            </label>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
          {
            path === "ACTIVE" && (
              <ul>
                {
                  todos.map((todo) => {
                    if (todo.completed) return;
                    return(
                      <li key={ todo.id } className="py-2" >
                        <div className="form-check">
                          {
                            todo.completed 
                              ? <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} defaultChecked onChange={() => completeTodo(todo.id)}/>
                              : <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} onChange={() => completeTodo(todo.id)}/>
                          }
                          <label
                            className={todo.completed ? "form-check-label text-decoration-line-through" : "form-check-label"} 
                            htmlFor={`check${todo.id}`}
                          >
                            { todo.title }
                          </label>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
          {
            path === "COMPLETED" && (
              <ul className="d-flex flex-column">
                {
                  todos.map((todo) => {
                    if (!todo.completed) return;
                    return(
                      <li key={ todo.id } className="container-fluid py-2" >
                        <div className="form-check d-flex justify-content-between gap-3">
                          <div>
                            {
                              todo.completed 
                                ? <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} defaultChecked onChange={() => completeTodo(todo.id)}/>
                                : <input className="form-check-input" type="checkbox" value="" id={`check${todo.id}`} onChange={() => completeTodo(todo.id)}/>
                            }
                            <label 
                              className={todo.completed ? "form-check-label text-decoration-line-through" : "form-check-label"} 
                              htmlFor={`check${todo.id}`}
                            >
                              { todo.title }
                            </label>
                          </div>
                          <div className="d-inline-block">
                            <i className="bi bi-trash" onClick={() => deleteTodo(todo.id)}></i>
                          </div>
                        </div>
                        
                      </li>
                    )
                  })
                }
                <li className="align-self-end" >
                  <button className="btn btn-danger my-4 float-right" onClick={() => deleteAllTodo()}>Delete All</button>
                </li>
              </ul>
            )
          }
        </div>

      </main>
      <footer>
          <p className="footer">
            created by  
              <span className="username">
                <a href="https://devchallenges.io/portfolio/Anselmo1122" target="_blank" rel='noreferrer'>
                  Anselmo1122
                </a>
              </span>
              - devChallenges.io
          </p>
      </footer>
    </div>
  )
}

export default App
