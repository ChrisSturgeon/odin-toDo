
import { format, parseJSON } from 'date-fns'
import { project, projectNames, fetchProject, completeTask, removeTask, saveProject } from './projects.js'
import { task } from './tasks.js';


const main = document.getElementById('main');
var activeProject = '';

function createProject() {
  var newProjectName = document.getElementById('projectInput');
  saveProject(newProjectName.value, project());
  newProjectName.value = '';
  makeSideBar();
  console.log('test')
};

function removeProject() {
  localStorage.removeItem(this.value);
  makeSideBar();
  activeProject = Object.keys(localStorage)[0];
  refreshTasks();
};

export function makeSideBar() {

  const sideBar = document.getElementById('sideBar');
  sideBar.innerHTML = '';

  const title = document.createElement('h1');
  title.innerText = "To Do"
  sideBar.appendChild(title);

  const newArea = document.createElement('div');
  sideBar.appendChild(newArea);
  const btnArea = document.createElement('div');
  sideBar.appendChild(btnArea);
 
  var newProjectInput = document.createElement('input');
  newProjectInput.setAttribute('id', 'projectInput');
  newArea.appendChild(newProjectInput);

  var submitBtn = document.createElement('button');
  submitBtn.innerText = "Add";
  submitBtn.addEventListener('click', (createProject));
  newArea.appendChild(submitBtn);

  for (var project of projectNames()) {
    var btn = document.createElement('button');
    btn.innerText = project.slice(0, 1).toUpperCase() + project.slice(1);
    btn.setAttribute('value', project);
    btn.addEventListener('click', showTasks);
    btnArea.appendChild(btn);
  };
}

// Shows overview of all tasks for a project. 
function showTasks() {
  activeProject = this.value;
  var project = fetchProject ( this.value );
  main.innerHTML = '';
  createFrame();
  createHeader(`${this.value} Tasks`);
  createTaskTable(project);
};

export function refreshTasks() {
  var project = fetchProject (activeProject);
  main.innerHTML = '';
  createFrame();
  createHeader(`${activeProject} Tasks`);
  createTaskTable(project);
};

// Creates Task Frame
function createFrame() {
  const frame = document.createElement('div');
  frame.setAttribute('id', 'taskFrame');
  frame.classList.add('taskFrame');
  main.appendChild(frame);
};

// Creates header for Task Frame
function createHeader(name) {
  var header = document.createElement('div');
  header.setAttribute('id', 'header');
  header.classList.add('header');

  var title = document.createElement('h1');
  title.innerText = name.slice(0, 1).toUpperCase() + name.slice(1);
  header.appendChild(title);

  var frame = document.getElementById('taskFrame');
  frame.appendChild(header);
};

// Creates task overview table
function createTaskTable(project) {

  var header = document.getElementById('header');
  var newBtn = document.createElement('button');
  newBtn.innerText = "New Task";
  newBtn.addEventListener('click', newTaskForm);
  header.appendChild(newBtn);
  var delProject = document.createElement('button');
  delProject.innerText = "Delete project";
  delProject.setAttribute('value', activeProject);
  delProject.addEventListener('click', removeProject);
  header.appendChild(delProject);

  const table = document.createElement('table');
  table.setAttribute('id', 'taskTable');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Due Date', 'Priority', 'Complete', 'View/Edit', 'Delete'];
  for (var header of headers) {
    var headerCell = document.createElement('th');
    headerCell.innerText = header;
    headerRow.appendChild(headerCell);
  };
  table.appendChild(headerRow);
  taskFrame.appendChild(table);

  for (var task of project.arr) {
    const table = document.getElementById('taskTable');
    var row = document.createElement('tr');
    table.appendChild(row);

    var title = document.createElement('td');
    title.innerText = task.title.slice(0, 1).toUpperCase() + task.title.slice(1);
    row.appendChild(title);

    var dueDate = document.createElement('td');
    dueDate.innerText = format((parseJSON(task.dueDate)), 'EE. do MMM yy');
    row.appendChild(dueDate);

    var priority = document.createElement('td');
    priority.innerText = task.priority;
    row.appendChild(priority);

    var completeBtn = document.createElement('button');

    if (task['completed'] == false) {
      completeBtn.innerHTML = '	&nbsp;';
      
    } else {
      completeBtn.innerHTML = '&#10003;';
      row.style.opacity = "30%";
    }
    completeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
    completeBtn.addEventListener('click', completeTask);
    row.appendChild(completeBtn);

    var view = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.innerHTML = '&rarr;';
    viewBtn.setAttribute('value', task.title);
    viewBtn.addEventListener('click', viewTask);
    view.appendChild(viewBtn);
    row.appendChild(view);

    var remove = document.createElement('td');
    row.appendChild(remove);
    var removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
    removeBtn.addEventListener('click', removeTask);
    remove.appendChild(removeBtn);
  };
};

function newTaskForm() {
  main.innerHTML = '';
  const form = document.createElement('div');
  form.classList.add('newTaskForm');

  var header = document.createElement('h1');
  header.innerText = `New task in ${activeProject}`;
  header.setAttribute('id', 'header');
  form.appendChild(header);

  var formInputs = document.createElement('div');
  formInputs.classList.add('formInputs');

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
    var option = document.createElement('option');
    option.value = level;
    option.innerText = level;
    priority.appendChild(option);
  }

  formInputs.appendChild(priorityLabel);
  formInputs.appendChild(priority);

  form.appendChild(formInputs);

  var addBtn = document.createElement('button');
  addBtn.innerText = "Add Task";
  addBtn.setAttribute('id', 'addBtn');
  addBtn.addEventListener('click', saveTask);
  form.appendChild(addBtn);
  main.appendChild(form);
};

// Saves new task into active project
function saveTask() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var dueDate = new Date(document.getElementById('dueDate').value);
  var priority = document.getElementById('priority').value;
  var newTask = task(title, description, priority, dueDate);
  var project = fetchProject(activeProject);
  project.addTask(newTask);
  saveProject(activeProject, project);
  refreshTasks();
};

// Shows full details for given task
function viewTask() {
  var project = fetchProject(activeProject);
  var task = project.fetchTask(this.value);

  main.innerHTML = '';
  main.classList.add('tasksMain');
  const frame = document.createElement('div');
  frame.classList.add('taskFrame');
  main.appendChild(frame);

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
  project.innerText = activeProject;
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
  completeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
  completeBtn.addEventListener('click', completeTask);
  taskBtns.appendChild(completeBtn);

  var editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.setAttribute('value', task.title);
  editBtn.addEventListener('click', editTask);
  taskBtns.appendChild(editBtn);

  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Remove';
  deleteBtn.setAttribute('value', task.title);
  deleteBtn.setAttribute('value', `${activeProject} + ${task.title}`);
  deleteBtn.addEventListener('click', removeTask);
  taskBtns.appendChild(deleteBtn);
};

function editTask() {
  newTaskForm();
  var project = fetchProject(activeProject);
  var task = project.fetchTask(this.value);

  document.getElementById('header').innerText = `Editing ${task.title}`;
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('dueDate').value = parseJSON(task.dueDate).toISOString().split('T')[0].slice(0, 10);
  document.getElementById('priority').value = task.priority;

  var addBtn = document.getElementById('addBtn');
  addBtn.innerText = "Save edit";
  addBtn.removeEventListener('click', saveTask);
  addBtn.setAttribute('value', task.title);
  addBtn.addEventListener('click', saveEdit);
}

function saveEdit() {
  var project = fetchProject(activeProject);
  var index = project.findIndex(this.value);
  console.log(index);

  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var dueDate = new Date(document.getElementById('dueDate').value);
  var priority = document.getElementById('priority').value;

  var newTask = task(title, description, priority, dueDate);

  var project = fetchProject(activeProject);
  var index = project.findIndex(this.value);

  project.arr.splice(index, 1, newTask);

  // project.addTask(newTask);
  saveProject(activeProject, project);
  refreshTasks();
};
