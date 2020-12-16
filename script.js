const rootElement = document.getElementById("root");
const Header = () => {
    return (
        <div className="m-3 header text-center">
            TO DO LIST
        </div>

    )
}

const ToDoApp = () => {
    const [todoList, setToDoList] = React.useState([["Sample task 1", "Complete to-do app task by today", "done"],["Sample task 2", "Complete tasks", "todo"]]); //counts will be initialized as a list - [0]
    const [textTitle, setTitleText] = React.useState("");
    const [textTask, setTaskText] = React.useState("");
    const [filterOption, setfilterOption] = React.useState("all")
    const [editTask, seteditTask] = React.useState(false)
    const addTask = () => {
        if (textTask == "" || textTitle == "") {
            alert("Empty Input Not Accepted!!")
        } else {
            setToDoList(todoList.concat([[textTitle, textTask, "todo"]]))
            alert("Task added successfully")
        }
        setTitleText("")
        setTaskText("")
    }
    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setTitleText(event.target.value);
    };

    const handleTaskChange = (event) => {
        setTaskText(event.target.value);
    };

    const deleteTask = (index) => {

        setToDoList(
            todoList.filter((elem, idx) => {

                return idx !== index
            }
            )
        )
    }

    const changeStatus = (index) => {
        todoList.map((val, idx) => {
            if (idx === index) {
                val[2] = val[2] === "done" ? "todo" : "done"
            }
        })
        setToDoList([...todoList])
    }


    const filter = (type) => {
        setfilterOption(type)
    }

    const Status = (props) => {
        return props.status === "done" ? <span style={{ "borderRadius": "5px" }} className="text-white p-1 bg-success">Done</span> : <span style={{ "borderRadius": "5px" }} className=" text-white p-1 bg-danger">todo</span>
    }

    const Button = (props) => {
        return (<button className={props.className} onClick={props.onClick} >{props.text}</button>)
    }

    const Filter = () => {
        return (<div>
            <Button className="btn btn-light m-1"
                onClick={() => filter("all")}
                text="Show AllTasks" ></Button>
            <Button className="btn btn-danger m-1"
                onClick={() => filter("todo")}
                text="ToDo Tasks" ></Button>
            <Button className="btn btn-success m-1"
                onClick={() => filter("done")}
                text="Completed Tasks" ></Button>
        </div>)
    }

    const updateTask = (index) => {
        seteditTask(index)
    }

    const TodoHeader = ({ text, index }) => {
        return (<div className="card-header text-dark font-weight-bold p-1">{text[0]} &nbsp; &nbsp;
            <Status status={text[2]}></Status>
            <Button className="btn btn-outline-danger float-right"
                onClick={() => deleteTask(index)}
                text={<i className="far fa-trash-alt"></i>} ></Button>
            <Button className="btn btn-outline-secondary float-right mr-1"
                onClick={() => updateTask(index)}
                text={<i className="fas fa-edit"></i>} ></Button>
            <Button className="btn btn-outline-success float-right mr-1"
                onClick={() => changeStatus(index)}
                text={<i className="far fa-check-circle"></i>} ></Button>
        </div>)
    }

    const TodoContent = ({ text, index }) => {
        return (<div className="card-body p-2 text-dark">
            <p className="card-text">{text[1]}</p>
        </div>)
    }

    const ToDoItem = ({ text, index }) => {
        return (
            <div className="card border-primary mt-2 mb-2">
                <TodoHeader text={text} index={index}></TodoHeader>
                <TodoContent text={text} index={index}></TodoContent>
            </div>
        )
    }

    const updateDetails = (index) => {
        console.log("im called");
        if (textTask == "" || textTitle == "") {
            alert("Empty Input Not Accepted!!")
        } else {
            todoList[index][0] = textTitle
            todoList[index][1] = textTask
            setToDoList(todoList)
            alert("Task updated successfully")
            seteditTask(false)
        }
        setTitleText("")
        setTaskText("")

    }



    if (editTask !== false) {
        console.log("Here")
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Header></Header>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Title">Title</label>
                                <input type="text" maxLength="15" className="form-control" placeHolder={todoList[editTask][0]} value={textTitle} id="Title" onChange={handleTitleChange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Task">Task</label>
                                <textarea className="form-control" id="Task" placeHolder={todoList[editTask][1]} value={textTask} onChange={handleTaskChange}></textarea>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn heading" onClick={() => updateDetails(editTask)}>Update Task</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Header></Header>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Title">Title</label>
                                <input type="text" maxLength="15" className="form-control" value={textTitle} id="Title" onChange={handleTitleChange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Task">Task</label>
                                <textarea className="form-control" id="Task" value={textTask} onChange={handleTaskChange}></textarea>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn heading" onClick={addTask}>Add New Task</button>
                    </div>

                    <div className="col-lg-6 mt-3 tasks">
                        <Filter />
                        {
                            todoList.filter((elem) => {
                                if (filterOption == "all") {
                                    return true
                                }
                                else if (elem[2] === filterOption) {
                                    return true
                                }
                            }).map((text, index) => {
                                return (
                                    <div key={index}>
                                        <ToDoItem text={text} index={index}></ToDoItem>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );

    }

};


ReactDOM.render(<ToDoApp />, rootElement);