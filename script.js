const inputEl = document.querySelector("input");
const container = document.querySelector(".todo-container");

let todos = JSON.parse(localStorage.getItem('taskSaved'));
if (todos) {
  todos.forEach((todo) => {
    addTask(todo);
  });
}

container.addEventListener("submit", (e)=>{
    e.preventDefault()
    addTask()
});
function addTask(newTask) {
    let todoText = inputEl.value
    if(newTask) todoText = newTask.text
  if (todoText) {
    let task = document.createElement("div");
    task.classList.add("todo");
    if(newTask && newTask.completed){
        task.classList.add("completed")
    }
    task.innerText = todoText;

    task.addEventListener("click", () => {
        task.classList.toggle("completed");
        updateLS()
    });
    task.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        task.remove();
        updateLS()
    });

    container.appendChild(task);
    inputEl.value = "";

    updateLS()
  }
}

function updateLS(){
    const todoEls = document.querySelectorAll('.todo')
    let todosArray = []

    todoEls.forEach(todo=>{
        todosArray.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        })
    })
    
    localStorage.setItem('taskSaved', JSON.stringify(todosArray))
}