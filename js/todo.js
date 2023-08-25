const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos  = [];


function saveTodo(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter((item) => item.id !== parseInt(li.id));
    saveTodo();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    console.log(newTodoObj);
    todos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveTodo();
}

todoForm.addEventListener("submit", handleSubmit);

const savedTodo = localStorage.getItem(TODOS_KEY);

if(savedTodo !== null){
    const parsedToDos = JSON.parse(savedTodo);
    todos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}



