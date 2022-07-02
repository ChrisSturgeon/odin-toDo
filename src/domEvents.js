
import { format, parseISO, parseJSON } from 'date-fns'
import { projectNames, fetchTask, fetchProject, fetchTasks, completeTask } from './projects.js'

const main = document.getElementById('main');

var activeProject = '';

// Creates sidebar project buttons
export function projectBtns() {
  var content = document.getElementById('projectBtns');
  for (var project of projectNames()) {
    var btn = document.createElement('button');
    btn.innerText = project.slice(0, 1).toUpperCase() + project.slice(1);
    btn.setAttribute('value', project);
    btn.addEventListener('click', showTasks);
    content.appendChild(btn);
  };
};

// Shows overview of all tasks for a project. 
function showTasks() {
  activeProject = this.value;
  var project = fetchProject ( this.value );
  var projectName = ( this.value );
  main.innerHTML = '';
  createFrame();
  createHeader(`${this.value} Tasks`);
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
  header.classList.add('header');

  var title = document.createElement('h1');
  title.innerText = name.slice(0, 1).toUpperCase() + name.slice(1);
  header.appendChild(title);

  var frame = document.getElementById('taskFrame');
  frame.appendChild(header);
};

// Creates task overview table
function createTaskTable(project) {

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
    completeBtn.innerText = 'Mark Done';
    completeBtn.setAttribute('value', `${activeProject} + ${task.title}`);
    completeBtn.addEventListener('click', completeTask);
    row.appendChild(completeBtn);

    var view = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.innerHTML = '&rarr;';
    viewBtn.setAttribute('value', task.title);
    // viewBtn.addEventListener('click', showTask);
    view.appendChild(viewBtn);
    row.appendChild(view);

    var remove = document.createElement('td');
    row.appendChild(remove);
    var removeBtn = document.createElement('button');
    removeBtn.innerText = "Remove";
    removeBtn.setAttribute('value', task.title)
    // removeBtn.addEventListener('click', () => {removeItem(removeBtn.value)});
    remove.appendChild(removeBtn);

    
  };
};

