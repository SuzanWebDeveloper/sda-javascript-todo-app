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
  if (todos.length) {
    try {
      for (let index = 0; index < todos.length; index++) {
        createTodoElement(todos, index);
      }

      //create delete all Button to div(todoItem)
      deleteAllBtn.textContent = 'Delete All';
      deleteAllBtn.addEventListener('click', () => deleteAllTodos());
      deleteAllBtn.style.display = 'initial';

      todosCount.textContent = `Number of todos: ${todos.length}`;
    } catch (error) {
      console.log('An error occured while fetching todo');
    }
  }
}

function createTodoElement(todos, index) {
  //create div for todo item
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo');

  //create checkbox for todo item and add it to div(todoItem)
  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.checked = todos[index].completed;
  todoItem.appendChild(todoCheckbox);
  //**new added code for checked strikeout **
  todoCheckbox.classList.add('checked');
  todoCheckbox.addEventListener('click', () => handleCheck(index));
  function handleCheck(index) {
    console.log(todoCheckbox.checked);
    todoCheckbox.nextSibling.classList.toggle('strikeOut');
  }
  //-----------------

  // create description for todo item and add it to div(todoItem)
  const todoDescription = document.createElement('p');
  todoDescription.textContent = todos[index].description;
  todoItem.appendChild(todoDescription);

  // buttons
  // create edit Button and add ot to div(todoItem)
  const todoEditButton = document.createElement('button');
  todoEditButton.innerHTML = `<i class="fa-regular fa-pen-to-square" style="color: #694a0e;"></i>`;
  todoEditButton.classList.add('edit-btn');
  todoItem.appendChild(todoEditButton);
  todoEditButton.addEventListener('click', () => editTodo(index));

  // create delete Button and add ot to div(todoItem)
  const todoDeleteButton = document.createElement('button');
  todoDeleteButton.innerHTML = `<i class="fa-regular fa-trash-can" style="color:#694a0e;"></i>`;
  todoDeleteButton.classList.add('delete-btn');
  todoDeleteButton.addEventListener('click', () => deleteTodo(index));
  todoItem.appendChild(todoDeleteButton);

  todosList.appendChild(todoItem);
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
    } else {
      alert('There no text to add');
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

//delete all todos
function deleteAllTodos() {
  todosList.innerHTML = '';
  localStorage.removeItem('todos', JSON.stringify(todos));
  todos = [];
  todosCount.textContent = `Number of todos: ${todos.length}`;
}

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
todoInputSearch.addEventListener('input', function (event) {
  // event.preventDefault();
  todosCount.textContent = '';
  const searchKey = todoInputSearch.value.trim();
  if (searchKey) {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(function (el) {
      if (el.textContent.toLowerCase().indexOf(searchKey.toLowerCase()) > -1)
        el.classList.remove('hidden');
      else el.classList.add('hidden');
    });
  }

  //  //search todo
  // searchForm.addEventListener('submit', function (event) {
  //   event.preventDefault();
  //   const searchKey = todoInputSearch.value.trim();
  //   if (searchKey) {
  //     const todos = document.querySelectorAll('.todo');
  //     todos.forEach(function (el) {
  //       if (el.textContent.toLowerCase().indexOf(searchKey.toLowerCase()) > -1)
  //         el.classList.remove('hidden');
  //       else el.classList.add('hidden');
  //     });
  //   }
  //clear serch input and results ??
  //todoInputSearch.value = '';
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
