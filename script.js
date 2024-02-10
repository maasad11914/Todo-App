// Finding element
const todocard = document.querySelector(".todo-card");
const todoform = document.querySelector(".todo-form");
const todobtn = document.querySelector("#todo-btn");
const input = document.querySelector("input");
const lists = document.querySelector(".lists");
const messege = document.querySelector("#messege");

// Get local todo
const getTodos = () => {
    return localStorage.getItem("mytodos")? 
    JSON.parse(localStorage.getItem("mytodos")):[];
}

// Add Todo
function addTodo(event){
    event.preventDefault();
    let todoValue = input.value;
    const todoId = Date.now().toString();
    creatTodo(todoId,todoValue);

    showMassege("Todo added","success");
    
    // Add to local
    todos = getTodos();
    todos.push({todoId, todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
}

// Creat todo
const creatTodo = (todoId,todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("list-style");
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span> <button class="btn" id="delete-btn"><i class="fa fa-trash"></i></button></span>
    `;  
    lists.appendChild(todoElement);
    
    const deleteBtn = todoElement.querySelector("#delete-btn");
    deleteBtn.addEventListener("click", deleteTodo);

}

// Show Massege
function showMassege(text,status){
    messege.innerHTML = text;
    messege.classList.add(status);
    setTimeout(()=>{
        messege.innerHTML = "";
        messege.classList.remove(status);
    },2000);
}


// Delete Todo
function deleteTodo(event){
    const thisTodo = event.target.parentElement.parentElement.parentElement;
    lists.removeChild(thisTodo);
    showMassege("Todo deleted","unsuccess");

    let todos = getTodos();
    todos = todos.filter((todo)=>{
        return thisTodo.id !== todo.todoId ;
    })
    localStorage.setItem("mytodos",JSON.stringify(todos));

}

// Load todos
const loadTodos = () => {
    let todos = getTodos();
    todos.map((todo) => {
        creatTodo(todo.todoId, todo.todoValue);
    });
}

// Events
todoform.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);


