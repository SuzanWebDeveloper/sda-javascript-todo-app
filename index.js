//@ts-nocheck

const todosList = document.querySelector('.todos-list');
const addButton = document.querySelector('#add-btn');
const todoInput = document.querySelector('#todo-input');
const todosContainer = document.querySelector('.todos-container');
const todosCount = document.querySelector('.todos-sum');
const todoInputSearch = document.querySelector('#search-input');
const searchForm = document.querySelector('.search');
const deleteAllBtn = document.querySelector('#delete-all-btn');
const footer = document.querySelector('.footer');

let todos = [];

// display todos
function displayTodos(todos) {
  todosList.innerHTML = '';
  if (todos.length === 0) {
    console.log('no todos found');
  } else {
    try {
      for (let index = 0; index < todos.length; index++) {
        // console.log(todos[index].description);
        createTodoElement(todos, index);
      }

      //create delete all Button to div(todoItem)
      deleteAllBtn.textContent = 'Delete All';
      deleteAllBtn.addEventListener('click', () => deleteAllTodos());
      deleteAllBtn.style.display = 'initial';
      //  footer.appendChild(todoDeleteButton);

      todosCount.textContent = `Number of todos: ${todos.length}`;
    } catch (error) {
      console.log('An error occured while fetching todo');
    }
  }
}

function createTodoElement(todos, index) {
  //create div for todo item
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo'); //class todo for styling item--do later

  //create checkbox for todo item and add it to div(todoItem)
  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.checked = todos[index].completed;
  todoItem.appendChild(todoCheckbox);

  // create description for todo item and add it to div(todoItem)
  const todoDescription = document.createElement('p');
  todoDescription.textContent = todos[index].description;
  todoItem.appendChild(todoDescription);

  // buttons
  // create delete Button and add ot to div(todoItem)
  const todoDeleteButton = document.createElement('button');
  todoDeleteButton.innerHTML = 'delete';
  todoDeleteButton.addEventListener('click', () => deleteTodo(index));
  todoItem.appendChild(todoDeleteButton);

  // create edit Button and add ot to div(todoItem)
  const todoEditButton = document.createElement('button');
  todoEditButton.textContent = 'Edit';
  todoItem.appendChild(todoEditButton);
  todoEditButton.addEventListener('click', () => editTodo(index));

  todosList.appendChild(todoItem);
  //console.log(todoItem);
}

//add todo()
function addTodo() {
  try {
    const todoDescription = todoInput.value.trim();
    if (todoDescription) {
      const newTodo = {
        description: todoDescription,
        completed: false,
      };
      todoInput.value = '';
      todos.push(newTodo);
      displayTodos(todos);
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log(todos.length);
    }
  } catch (error) {
    console.log('An error occured while adding todo');
  }
}

//delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
  if (todos.length === 0)
    todosCount.textContent = `Number of todos: ${todos.length}`;
}

// //delete all todos
function deleteAllTodos() {
  todosList.innerHTML = '';
  localStorage.removeItem('todos', JSON.stringify(todos));
  todos = [];
  todosCount.textContent = `Number of todos: ${todos.length}`;
}

// });

//edit todo
function editTodo(index) {
  try {
    const updatedDescription = prompt('Edit Todo: ', todos[index].description);
    if (updatedDescription) {
      todos[index].description = updatedDescription;
      localStorage.setItem('todos', JSON.stringify(todos));
      displayTodos(todos);
    }
  } catch (error) {
    console.log(error);
  }
}

//search todo
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const serchString = todoInputSearch.value.trim();
  if (serchString) {
    alert('test');
  }
});

function loadDataFromLocalStorage() {
  try {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      todos = storedTodos;
      displayTodos(todos);
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);

addButton.addEventListener('click', addTodo);

displayTodos(todos);
