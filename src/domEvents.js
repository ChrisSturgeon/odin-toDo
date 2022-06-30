import { format, parseISO } from 'date-fns'
import { task } from './task.js';
import { saveTask, fetchAll, filterTasks, getProjectNames, complete } from './storage.js';
import { projects, projectObj, projectsList, newProject } from './project.js'

const main = document.getElementById('main');

function addTask() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var project = document.getElementById('project').value;
  var date = format(parseISO(document.getElementById('dueDate').value), 'EE. do MMM yy');
  var priority = document.getElementById('priority').value;
  var tempTask = task(title, description, project, date, priority);

  saveTask(tempTask);
  projectBtns();
}

// Generates sidebar project buttons, clearing existing buttons. 
function projectBtns() {
  var names = projectsList();
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
  const headers = ['Title', 'Due Date', 'Priority', 'Complete'];

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

    var dueDate = document.createElement('td');
    dueDate.innerText = task.dueDate;
    row.appendChild(dueDate);

    var priority = document.createElement('td');
    priority.innerText = task.priority;
    row.appendChild(priority);
   

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
  projectLabel.innerText = 'Project'
  projectLabel.setAttribute('for', 'project');

  var projectSelect = document.createElement('select');
  projectSelect.setAttribute('id', 'project');
  projectSelect.setAttribute('name', 'project');

  var names = projectsList();
  for (var name of names) {
    var option = document.createElement('option');
    option.value = name;
    option.innerText = name;
    projectSelect.appendChild(option);
  }

  formInputs.appendChild(projectLabel);
  formInputs.appendChild(projectSelect);


  var titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title'
  var titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'title');
  formInputs.appendChild(titleLabel);
  formInputs.appendChild(titleInput);

  var descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description'
  var descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('id', 'description');
  formInputs.appendChild(descriptionLabel);
  formInputs.appendChild(descriptionInput);

  var dateLabel = document.createElement('label');
  dateLabel.innerText = 'Due Date';
  dateLabel.setAttribute('for', 'dueDate');

  var dueDate = document.createElement('input');
  dueDate.setAttribute('type', 'date');
  dueDate.setAttribute('name', 'dueDate');
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('value', '2022-06-30');

  formInputs.appendChild(dateLabel);
  formInputs.appendChild(dueDate);

  var priorityLabel = document.createElement('label');
  priorityLabel.innerText = 'Priority';
  priorityLabel.setAttribute('for', 'priority');

  var priority = document.createElement('select');
  priority.setAttribute('id', 'priority');
  priority.setAttribute('name', 'priority');
  var levels = ['medium', 'high', 'low'];

  for (var level of levels) {
    option = document.createElement('option');
    option.value = level;
    option.innerText = level;
    priority.appendChild(option);
  }

  formInputs.appendChild(priorityLabel);
  formInputs.appendChild(priority);

  form.appendChild(formInputs);

  // Submit button

  var addBtn = document.createElement('button');
  addBtn.innerText = "Add Task"
  addBtn.addEventListener('click', addTask);
  form.appendChild(addBtn);


  main.appendChild(form);

}

// Shows new project form

function addProject() {
  main.innerHTML = '';
  main.classList.add('newTaskMain');

  const form = document.createElement('div');
  form.classList.add('newTaskForm');

  main.appendChild(form);

  var header = document.createElement('h1');
  header.innerText = "New Project";
  form.appendChild(header);

  var nameLabel = document.createElement('label');
  nameLabel.innerText = 'Project name';

  var nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'nameInput');

  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  var submitBtn = document.createElement('button');
  submitBtn.innerText = "Add Project";

  form.appendChild(submitBtn);

  submitBtn.addEventListener('click', setProject)

}

function setProject() {
  var name = document.getElementById('nameInput').value;
  newProject(name);

}


projectBtns();

newTask();

document.getElementById('newTask').addEventListener('click', newTask);
document.getElementById('newProject').addEventListener('click', addProject);
