const todosList = document.querySelector('.todos-list');
const addButton = document.querySelector('#add-btn');
const todoInput = document.querySelector('#todo-input');
const todosContainer = document.querySelector('.todos-container');

const todos = [
  // { description: 'learn react js', completed: false },
  // { description: 'learn typescript', completed: false },
  // { description: 'learn nodde js', completed: false },
];

// display todos
function displayTodos(todos) {
  todosList.innerHTML = '';
  if (todos.length === 0) {
    console.log('no todos found');
  } else {
    for (let index = 0; index < todos.length; index++) {
      // console.log(todos[index].description);

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
      todoDeleteButton.textContent = 'Delete';
      todoDeleteButton.addEventListener('click', () => deleteTodo(index));
      todoItem.appendChild(todoDeleteButton);

      // create edit Button and add ot to div(todoItem)
      const todoEditButton = document.createElement('button');
      todoEditButton.textContent = 'Edit';
      todoItem.appendChild(todoEditButton);
      todoEditButton.addEventListener('click', () => editTodo(index));

      todosList.appendChild(todoItem);
    }
    sumtodos(todos.length);
  }
}

// display sum of todos
function sumtodos(todosLength) {
  //todosSum.innerHTML = '';
  const todosSum = document.createElement('h3');
  todosSum.textContent = `Number of Todos: ${todosLength}`;
  todosContainer.appendChild(todosSum);
}

//add todo()
function addTodo() {
  const todoDescription = todoInput.value.trim();
  if (todoDescription) {
    const newTodo = {
      description: todoDescription,
      completed: false,
    };
    todos.push(newTodo);
    displayTodos(todos);
  }
}

//delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos(todos);
}

//update todo
function updateTodo() {
  console.log('todo is updated');
}

addButton.addEventListener('click', addTodo);
displayTodos(todos);
