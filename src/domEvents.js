 import { task } from './task.js';
import { saveTask, fetchAll, filterTasks, getProjectNames, complete } from './storage.js';

const main = document.getElementById('main');

function addTask() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var project = document.getElementById('project').value;
  var tempTask = task(title, description, project);

  console.log(title);
  console.log(description);
  saveTask(tempTask);
  projectBtns();
}

// Generates sidebar project buttons, clearing existing buttons. 
function projectBtns() {
  var names = getProjectNames();
  var sideBar = document.getElementById('sideBar');
  var projectBtns = document.getElementById('projectBtns')
  projectBtns.innerHTML = '';

  for (var name of names) {
    var btn = document.createElement('button');
    btn.innerText = name;
    btn.value = name;
    btn.addEventListener('click', showTasks);
    projectBtns.appendChild(btn);
  };
  sideBar.appendChild(projectBtns);
};

// Generates all tasks for individual project

function showTasks() {
  main.innerHTML = '';
  main.classList.add('tasksMain');
  const frame = document.createElement('div');
  frame.classList.add('taskFrame');
  main.appendChild(frame);

  const header = document.createElement('h1');
  header.innerText = `${this.value} tasks`;
  frame.appendChild(header);

  var tasks = filterTasks(this.value);
  console.log(tasks);

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Description', 'Complete'];

  for (var dog of headers) {
    var headerCell = document.createElement('th');
    headerCell.innerText = dog;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  for (var task of tasks) {
    var row = document.createElement('tr');
    var title = document.createElement('td');
    title.innerText = task.title;
    row.appendChild(title);

    var description = document.createElement('td');
    description.innerText = task.description;
    row.appendChild(description);
   

    var completeBtn = document.createElement('button');
    completeBtn.innerText = 'Mark Done';
    completeBtn.setAttribute('value', task.title);
    completeBtn.addEventListener('click', complete);
    row.appendChild(completeBtn);
    table.appendChild(row);
  }





  frame.appendChild(table);

}



// New Task page

function newTask() {

  main.innerHTML = '';
  main.classList.add('newTaskMain');

  const form = document.createElement('div');
  form.classList.add('newTaskForm');
  
  var header = document.createElement('h1');
  header.innerText = "New Task";
  form.appendChild(header);

  var formInputs = document.createElement('div');
  formInputs.classList.add('formInputs')
  
  var projectLabel = document.createElement('label');
  projectLabel.innerText = 'Project: '
  projectLabel.setAttribute('for', 'project');

  var projectSelect = document.createElement('select');
  projectSelect.setAttribute('id', 'project');
  projectSelect.setAttribute('name', 'project');

  var names = getProjectNames();
  for (var name of names) {
    var option = document.createElement('option');
    option.value = name;
    option.innerText = name;
    projectSelect.appendChild(option);
  }

  formInputs.appendChild(projectLabel);
  formInputs.appendChild(projectSelect);





  // var projectInput = document.createElement('input');
  // projectInput.setAttribute('id', 'project');
  // formInputs.appendChild(projectLabel);
  // formInputs.appendChild(projectInput);

  var titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title: '
  var titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'title');
  formInputs.appendChild(titleLabel);
  formInputs.appendChild(titleInput);

  var descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description: '
  var descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('id', 'description');
  formInputs.appendChild(descriptionLabel);
  formInputs.appendChild(descriptionInput);

  form.appendChild(formInputs);

  // Submit button

  var addBtn = document.createElement('button');
  addBtn.innerText = "Add Task"
  addBtn.addEventListener('click', addTask);
  form.appendChild(addBtn);


  main.appendChild(form);
  

}

projectBtns();

newTask();

document.getElementById('newTask').addEventListener('click', newTask)










