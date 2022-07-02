import { format, parseISO, parseJSON } from 'date-fns'
import { task } from './task.js';
import { saveTask, fetchTask, filterTasks, getProjectNames, complete, removeItem, fetchAll } from './storage.js';
import { projects, projectObj, projectsList, newProject } from './project.js'

const main = document.getElementById('main');

function addTask() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var project = document.getElementById('project').value;
  var date = new Date(document.getElementById('dueDate').value);
  var priority = document.getElementById('priority').value;
  var tempTask = task(title, description, project, date, priority);

  var cow = document.getElementById('title').value;
  console.log(cow);

  console.log(filterTasks('cow'));

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
    btn.addEventListener('click', showTasks(name));
    projectBtns.appendChild(btn);
  };
  sideBar.appendChild(projectBtns);
};

// Generates all tasks for individual project
function showTasks(name) {
  main.innerHTML = '';
  main.classList.add('tasksMain');
  const frame = document.createElement('div');
  frame.classList.add('taskFrame');
  main.appendChild(frame);

  const header = document.createElement('h1');
  header.innerText = `${name} tasks`;
  frame.appendChild(header);

  var tasks = filterTasks(name);

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Due Date', 'Priority', 'Complete', 'View/Edit', 'Delete'];

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

    dueDate.innerText = format((parseJSON(task.dueDate)), 'EE. do MMM yy');
    row.appendChild(dueDate);

    var priority = document.createElement('td');
    priority.innerText = task.priority;
    row.appendChild(priority);
   
    var completeBtn = document.createElement('button');
    completeBtn.innerText = 'Mark Done';
    completeBtn.setAttribute('value', task.title);
    completeBtn.addEventListener('click', complete);
    row.appendChild(completeBtn);

    var view = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.innerHTML = '&rarr;';
    viewBtn.setAttribute('value', task.title);
    viewBtn.addEventListener('click', showTask);
    view.appendChild(viewBtn);
    row.appendChild(view);


    var remove = document.createElement('td');
    row.appendChild(remove);
    var removeBtn = document.createElement('button');
    removeBtn.innerText = "Remove";
    removeBtn.setAttribute('value', task.title)
    removeBtn.addEventListener('click', () => {removeItem(removeBtn.value)});
    remove.appendChild(removeBtn);
    
    table.appendChild(row);
  
  }

  frame.appendChild(table);

}

// Single task page;

function showTask() {
  main.innerHTML = '';
  main.classList.add('tasksMain');
  const frame = document.createElement('div');
  frame.classList.add('taskFrame');
  main.appendChild(frame);
  const task = fetchTask( this.value );

  var header = document.createElement('h1');
  header.innerText = task.title;
  frame.appendChild(header);

  var details = document.createElement('div');
  details.classList.add('formInputs');

  var descriptionLabel = document.createElement('div');
  descriptionLabel.innerText = 'Description';
  var description = document.createElement('div');
  description.innerText = task.description;
  details.appendChild(descriptionLabel);
  details.appendChild(description);


  var projectLabel = document.createElement('div');
  projectLabel.innerText = 'Project';
  var project = document.createElement('div');
  project.innerText = task.project;
  details.appendChild(projectLabel);
  details.appendChild(project);


  var dueDateLabel = document.createElement('div');
  dueDateLabel.innerText = 'Due Date';
  var dueDate = document.createElement('div');
  dueDate.innerText = format((parseJSON(task.dueDate)), 'EE. do MMM yy');
  details.appendChild(dueDateLabel);
  details.appendChild(dueDate);


  var priorityLabel = document.createElement('div');
  priorityLabel.innerText = 'Priority'
  var priority = document.createElement('div');
  priority.innerText = task.priority;
  details.appendChild(priorityLabel);
  details.appendChild(priority);
  frame.appendChild(details);

  var taskBtns = document.createElement('div');
  taskBtns.classList.add('taskBtns');
  frame.appendChild(taskBtns);

  var completeBtn = document.createElement('button');
  completeBtn.innerText = "Complete";
  completeBtn.setAttribute('value', task.title);
  completeBtn.addEventListener('click', complete);
  taskBtns.appendChild(completeBtn);

  var editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.setAttribute('value', task.title);
  editBtn.addEventListener('click', editTask);
  taskBtns.appendChild(editBtn);

  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Remove';
  deleteBtn.setAttribute('value', task.title);
  deleteBtn.addEventListener('click', removeItem)
  taskBtns.appendChild(deleteBtn);

}

function editTask() {
  var task = fetchTask( this.value );

  main.innerHTML = '';
  main.classList.add('newTaskMain');

  const form = document.createElement('div');
  form.classList.add('newTaskForm');
  
  var header = document.createElement('h1');
  header.innerText = "Edit Task";
  form.appendChild(header);

  main.appendChild(form);

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
  projectSelect.value = task.project;

  var titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title'
  var titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'title');
  titleInput.value = task.title;
  formInputs.appendChild(titleLabel);
  formInputs.appendChild(titleInput);

  var descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description'
  var descriptionInput = document.createElement('input');
  descriptionInput.value = task.description;
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
  dueDate.value = parseJSON(task.dueDate).toISOString().split('T')[0].slice(0, 10);
  
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

  priority.value = task.priority;
  formInputs.appendChild(priorityLabel);
  formInputs.appendChild(priority);

  form.appendChild(formInputs);

  var saveBtn = document.createElement('button');
  saveBtn.innerText = "Add Task"
  saveBtn.addEventListener('click', addTask);
  saveBtn.addEventListener('click', () => {removeItem(this.value)});
  
  form.appendChild(saveBtn);
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
  addBtn.innerText = "Add Task";
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
  projectBtns();

}


projectBtns();

newTask();

document.getElementById('newTask').addEventListener('click', newTask);
document.getElementById('newProject').addEventListener('click', addProject);
