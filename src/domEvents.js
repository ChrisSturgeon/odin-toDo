import { format, parseJSON } from 'date-fns';
import {
  test,
  projectNames,
  makeProject,
  fetchProject,
  completeTask,
  removeTask,
  saveProject,
} from './projects.js';
import { loadSampleData, loadBlankProject } from './sampleData.js';
import { task } from './tasks.js';
import { signIn } from './userDomEvents';

const main = document.getElementById('main');
var activeProject = '';

// Creates side bar content
export function makeSideBar() {
  var sideBar = document.getElementById('sideBar');
  sideBar.innerHTML = '';

  var title = document.createElement('h1');
  title.innerText = 'Do It!';
  sideBar.appendChild(title);

  var btnArea = document.createElement('div');
  btnArea.classList.add('projectBtns');
  sideBar.appendChild(btnArea);

  for (var project of projectNames()) {
    var btn = document.createElement('button');
    btn.innerText = capitalise(project);
    btn.setAttribute('value', project);
    btn.addEventListener('click', showTasks);
    btnArea.appendChild(btn);
  }

  var newProjectBtn = document.createElement('button');
  newProjectBtn.innerText = '+';
  newProjectBtn.setAttribute('id', 'newProjectBtn');
  newProjectBtn.addEventListener('click', createProject);
  btnArea.appendChild(newProjectBtn);

  var resetBtn = document.createElement('button');
  resetBtn.innerText = 'Reset All';
  resetBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });
  sideBar.appendChild(resetBtn);
}

// Creates main body frame and title
export function createFrame(titleText) {
  const frame = document.createElement('div');
  frame.setAttribute('id', 'taskFrame');
  frame.classList.add('taskFrame');
  main.appendChild(frame);

  var header = document.createElement('div');
  header.setAttribute('id', 'header');
  header.classList.add('header');

  var title = document.createElement('h1');
  title.setAttribute('id', 'pageTitle');
  title.innerText = titleText;
  header.appendChild(title);
  frame.appendChild(header);
}

// Refreshes page with tasks from active project.
export function refreshTasks() {
  var project = fetchProject(activeProject);
  main.innerHTML = '';
  var titleText = `${capitalise(activeProject)} Tasks`;
  createFrame(titleText);
  createProjectBtns();
  createTaskTable(project);
}

// Creates page to add new project
function createProject() {
  main.innerHTML = '';
  createFrame('New Project');
  var frame = document.getElementById('taskFrame');
  frame.classList.add('taskFrame');

  var inputs = document.createElement('div');
  inputs.classList.add('taskDetails');
  frame.appendChild(inputs);

  var inputLabel = document.createElement('label');
  inputLabel.innerText = 'Project name: ';
  inputs.appendChild(inputLabel);

  var titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'projectInput');
  inputs.appendChild(titleInput);

  var addBtn = document.createElement('button');
  addBtn.innerText = 'Add';
  addBtn.addEventListener('click', addProject);
  addBtn.classList.add('addBtn');
  frame.appendChild(addBtn);
}

// Creates new project from user-inputted name.
function addProject() {
  var newProjectName = document.getElementById('projectInput');
  if (newProjectName.value.length < 1) {
    alert('Please enter a project name');
  } else {
    var newProject = makeProject();
    saveProject(newProjectName.value, newProject);
    newProjectName.value = '';
    makeSideBar();
  }
}

// Removes project
function removeProject() {
  localStorage.removeItem(this.value);
  makeSideBar();
  activeProject = Object.keys(localStorage)[0];
  refreshTasks();
}

// Shows overview of all tasks for a project.
function showTasks() {
  activeProject = this.value;
  var project = fetchProject(this.value);
  main.innerHTML = '';

  var titleText = `${capitalise(activeProject)} Tasks`;
  createFrame(titleText);
  createProjectBtns();
  createTaskTable(project);
}

// Creates header for Task Frame
function createProjectBtns() {
  const header = document.getElementById('header');
  var btns = document.createElement('div');
  btns.classList.add('btns');
  header.appendChild(btns);

  var newBtn = document.createElement('button');
  newBtn.innerText = 'New Task';
  newBtn.addEventListener('click', newTaskForm);
  btns.appendChild(newBtn);
  var delProject = document.createElement('button');
  delProject.innerText = 'Delete project';
  delProject.setAttribute('value', activeProject);
  delProject.addEventListener('click', removeProject);
  btns.appendChild(delProject);
}

// Creates task overview table
function createTaskTable(project) {
  var header = document.getElementById('header');
  const table = document.createElement('table');
  table.setAttribute('id', 'taskTable');
  const headerRow = document.createElement('tr');
  const headers = [
    'Title',
    'Due Date',
    'Priority',
    'Complete',
    'View/Edit',
    'Delete',
  ];
  for (var header of headers) {
    var headerCell = document.createElement('th');
    headerCell.innerText = header;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);
  taskFrame.appendChild(table);

  for (var task of project.arr) {
    const table = document.getElementById('taskTable');
    var row = document.createElement('tr');
    table.appendChild(row);

    var title = document.createElement('td');
    title.innerText = capitalise(task.title);
    row.appendChild(title);

    var dueDate = document.createElement('td');
    dueDate.innerText = format(parseJSON(task.dueDate), 'EE. do MMM');
    row.appendChild(dueDate);

    var priority = document.createElement('td');
    priority.innerText = capitalise(task.priority);
    row.appendChild(priority);

    var completeBtn = document.createElement('button');
    completeBtn.classList.add('completeBtn');

    if (task['completed'] == false) {
      completeBtn.innerHTML = '&#10003';
    } else {
      completeBtn.innerHTML = '&#10003;';
      row.style.opacity = '30%';
    }
    completeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
    completeBtn.addEventListener('click', completeTask);
    completeBtn.addEventListener('click', refreshTasks);
    row.appendChild(completeBtn);

    var view = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.classList.add('viewBtn');
    viewBtn.innerHTML = '&rarr;';
    viewBtn.setAttribute('value', task.title);
    viewBtn.addEventListener('click', viewTask);
    view.appendChild(viewBtn);
    row.appendChild(view);

    var remove = document.createElement('td');
    row.appendChild(remove);
    var removeBtn = document.createElement('button');
    removeBtn.innerText = 'Del';
    removeBtn.classList.add('completeBtn');
    removeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
    removeBtn.addEventListener('click', removeTask);
    removeBtn.addEventListener('click', refreshTasks);
    remove.appendChild(removeBtn);
  }
}

// Creates page for inputting new task.
function newTaskForm() {
  main.innerHTML = '';
  var headerText = `New Task in ${capitalise(activeProject)}`;
  createFrame(headerText);

  var frame = document.getElementById('taskFrame');
  var formInputs = document.createElement('div');
  formInputs.classList.add('taskDetails');
  frame.appendChild(formInputs);

  var titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title:';
  var titleInput = document.createElement('input');
  titleInput.setAttribute('id', 'title');
  formInputs.appendChild(titleLabel);
  formInputs.appendChild(titleInput);

  var descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description:';
  var descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('id', 'description');
  formInputs.appendChild(descriptionLabel);
  formInputs.appendChild(descriptionInput);

  var dateLabel = document.createElement('label');
  dateLabel.innerText = 'Due Date:';
  dateLabel.setAttribute('for', 'dueDate');

  var dueDate = document.createElement('input');
  dueDate.setAttribute('type', 'date');
  dueDate.setAttribute('name', 'dueDate');
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('value', format(new Date(), 'yyyy-MM-dd'));

  formInputs.appendChild(dateLabel);
  formInputs.appendChild(dueDate);

  var priorityLabel = document.createElement('label');
  priorityLabel.innerText = 'Priority:';
  priorityLabel.setAttribute('for', 'priority');

  var priority = document.createElement('select');
  priority.setAttribute('id', 'priority');
  priority.setAttribute('name', 'priority');
  var levels = ['medium', 'high', 'low'];

  for (var level of levels) {
    var option = document.createElement('option');
    option.value = level;
    option.innerText = capitalise(level);
    priority.appendChild(option);
  }
  formInputs.appendChild(priorityLabel);
  formInputs.appendChild(priority);

  var btns = document.createElement('div');
  btns.classList.add('taskBtns');
  var addBtn = document.createElement('button');
  addBtn.innerText = 'Add Task';
  addBtn.setAttribute('id', 'addBtn');
  addBtn.addEventListener('click', saveTask);
  btns.appendChild(addBtn);

  var goBackBtn = document.createElement('button');
  goBackBtn.innerText = 'Go Back';
  goBackBtn.addEventListener('click', refreshTasks);
  btns.appendChild(goBackBtn);
  frame.appendChild(btns);
}

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
}

// Shows full details for given task
function viewTask() {
  var project = fetchProject(activeProject);
  var task = project.fetchTask(this.value);
  main.innerHTML = '';

  var titleText = `Details for ${task.title}`;
  createFrame(titleText);

  const frame = document.getElementById('taskFrame');
  var details = document.createElement('div');
  details.classList.add('taskDetails');

  var descriptionLabel = document.createElement('div');
  descriptionLabel.innerText = 'Description:';
  var description = document.createElement('div');
  description.innerText = capitalise(task.description);
  details.appendChild(descriptionLabel);
  details.appendChild(description);

  var projectLabel = document.createElement('div');
  projectLabel.innerText = 'Project:';
  var project = document.createElement('div');
  project.innerText = capitalise(activeProject);
  details.appendChild(projectLabel);
  details.appendChild(project);

  var dueDateLabel = document.createElement('div');
  dueDateLabel.innerText = 'Due Date:';
  var dueDate = document.createElement('div');
  dueDate.innerText = format(parseJSON(task.dueDate), 'EE. do MMM yy');
  details.appendChild(dueDateLabel);
  details.appendChild(dueDate);

  var priorityLabel = document.createElement('div');
  priorityLabel.innerText = 'Priority:';
  var priority = document.createElement('div');
  priority.innerText = capitalise(task.priority);
  details.appendChild(priorityLabel);
  details.appendChild(priority);
  frame.appendChild(details);

  var completeLabel = document.createElement('div');
  completeLabel.innerText = 'Complete:';

  var complete = document.createElement('div');

  details.appendChild(completeLabel);
  details.appendChild(complete);
  frame.appendChild(details);

  var taskBtns = document.createElement('div');
  taskBtns.classList.add('taskBtns');
  frame.appendChild(taskBtns);

  var completeBtn = document.createElement('button');

  if (task.completed) {
    completeBtn.innerHTML = '&#10003;';
    completeBtn.addEventListener('mouseover', () => {
      completeBtn.innerHTML = '&#x2717;';
    });
    completeBtn.addEventListener('mouseout', () => {
      completeBtn.innerHTML = '&#10003;';
    });
  } else {
    completeBtn.innerHTML = '&#x2717;';
    completeBtn.addEventListener('mouseover', () => {
      completeBtn.innerHTML = '&#10003;';
    });
    completeBtn.addEventListener('mouseout', () => {
      completeBtn.innerHTML = '&#x2717;';
    });
  }

  completeBtn.setAttribute('value', task.title);
  completeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
  completeBtn.classList.add('innerCompleteBtn');
  completeBtn.addEventListener('click', completeTask);
  completeBtn.addEventListener('click', refreshTasks);
  complete.appendChild(completeBtn);

  var editBtn = document.createElement('button');
  editBtn.innerText = 'Edit Task';
  editBtn.setAttribute('value', task.title);
  editBtn.addEventListener('click', editTask);
  taskBtns.appendChild(editBtn);

  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete Task';
  deleteBtn.setAttribute('value', task.title);
  deleteBtn.setAttribute('value', `${activeProject} + ${task.title}`);
  deleteBtn.addEventListener('click', removeTask);
  deleteBtn.addEventListener('click', refreshTasks);
  taskBtns.appendChild(deleteBtn);

  var goBackBtn = document.createElement('button');
  goBackBtn.innerText = 'Go Back';
  goBackBtn.addEventListener('click', refreshTasks);
  taskBtns.appendChild(goBackBtn);
}

// Creates page for editing task values.
function editTask() {
  newTaskForm();
  var project = fetchProject(activeProject);
  var task = project.fetchTask(this.value);

  document.getElementById(
    'pageTitle'
  ).innerText = `Editing task: ${task.title}`;
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('dueDate').value = parseJSON(task.dueDate)
    .toISOString()
    .split('T')[0]
    .slice(0, 10);
  document.getElementById('priority').value = task.priority;

  var addBtn = document.getElementById('addBtn');
  addBtn.innerText = 'Save edit';
  addBtn.removeEventListener('click', saveTask);
  addBtn.setAttribute('value', task.title);
  addBtn.addEventListener('click', saveEdit);
}

// Replaces old task in array with new task created from edited details.
function saveEdit() {
  var project = fetchProject(activeProject);
  var index = project.findIndex(this.value);

  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var dueDate = new Date(document.getElementById('dueDate').value);
  var priority = document.getElementById('priority').value;

  var newTask = task(title, description, priority, dueDate);

  var project = fetchProject(activeProject);
  var index = project.findIndex(this.value);

  project.arr.splice(index, 1, newTask);

  saveProject(activeProject, project);
  refreshTasks();
}

// Creates home page content displayed on first visit
export function homePage() {
  if (localStorage.length == 0) {
    activeProject = 'default';
    createFrame('Welcome!');

    main.removeChild(document.getElementById('taskFrame'));

    var frame = document.getElementById('taskFrame');
    frame.innerHTML = '';
    frame.classList.add('taskFrame');

    var intro = document.createElement('p');

    intro.innerText =
      'Would you like to load demo data or start your own blank project?';
    frame.appendChild(intro);

    var btns = document.createElement('div');
    btns.classList.add('taskBtns');
    frame.appendChild(btns);

    var demoBtn = document.createElement('button');
    demoBtn.innerText = 'Load Demo Data';
    demoBtn.setAttribute('id', 'demoBtn');
    demoBtn.addEventListener('click', () => {
      loadSampleData();
      activeProject = 'cleaning';
      makeSideBar();
      refreshTasks();
    });
    btns.appendChild(demoBtn);

    var blankProjectBtn = document.createElement('button');
    blankProjectBtn.innerText = 'Blank Project';
    blankProjectBtn.addEventListener('click', () => {
      loadBlankProject();
      activeProject = 'default';
      makeSideBar();
      refreshTasks();
    });
    btns.appendChild(blankProjectBtn);
  } else {
    activeProject = Object.keys(localStorage)[0];
    refreshTasks();
    makeSideBar();
  }
}

// Capitalises given word
export function capitalise(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function welcomePage() {
  main.innerHTML = '';
  createFrame('Welcome!');

  var frame = document.getElementById('taskFrame');
  frame.classList.add('taskFrame');

  const choicePara = document.createElement('p');
  choicePara.innerText =
    'This project can use either local storage or your google account to store projects and tasks. Which would you like to use?';
  frame.appendChild(choicePara);

  const choiceDiv = document.createElement('div');
  choiceDiv.classList.add('choiceDiv');
  frame.appendChild(choiceDiv);

  const fireBaseBtn = document.createElement('button');
  fireBaseBtn.innerText = 'Google account';
  fireBaseBtn.addEventListener('click', signIn);
  choiceDiv.appendChild(fireBaseBtn);

  const localStorageBtn = document.createElement('button');
  localStorageBtn.innerText = 'Local storage';
  localStorageBtn.addEventListener('click', homePage);
  choiceDiv.appendChild(localStorageBtn);
}
