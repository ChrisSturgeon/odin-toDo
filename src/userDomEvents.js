import { format, parseJSON } from 'date-fns';

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

function signOutUser() {
  signOut(getAuth());
  if (!isUserSignedIn()) {
    console.log('user logged out');
  }
}
import { saveProject } from './firebaseFunctions';
import { welcomePage, createFrame, capitalise } from './domEvents';
import { fetchProjects, fetchProject, saveTask } from './firebaseFunctions';

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  initFirebaseAuth();
  authStateObserver();
}

function authStateObserver(user) {
  if (user) {
    // When user signed in
    console.log('User signed in');
    createFBSideBar();
    fetchProjects();
  } else {
    // When no user signed in
    console.log('no user signed in');
    clearSideBar();
    welcomePage();
  }
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || 'images/profile_placeholder.png';
}

export function getUserName() {
  return getAuth().currentUser.displayName;
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

function sideBarReset() {
  const sideBar = document.getElementById('sideBar');
  if (document.getElementById('newProjectBtn')) {
    sideBar.removeChild(document.getElementById('newProjectBtn'));
  }
}

function createFBSideBar() {
  const sideBar = document.getElementById('sideBar');
  sideBar.innerHTML = '';

  const title = document.createElement('h1');
  title.innerText = 'Do It!';
  sideBar.appendChild(title);

  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projectsDiv');
  projectsDiv.setAttribute('id', 'projectsDiv');
  sideBar.appendChild(projectsDiv);

  const addProjectBtn = document.createElement('button');
  addProjectBtn.innerText = 'New Project';
  addProjectBtn.addEventListener('click', newProject);
  projectsDiv.appendChild(addProjectBtn);

  const userDetails = document.createElement('div');
  userDetails.setAttribute('id', 'userDetails');
  userDetails.classList.add('user-details');

  const profileImg = document.createElement('img');
  profileImg.setAttribute('src', getProfilePicUrl());
  userDetails.appendChild(profileImg);

  const userText = document.createElement('div');
  userText.innerHTML = `${getUserName()}`;
  userDetails.appendChild(userText);

  sideBar.appendChild(userDetails);

  const logoutBtn = document.createElement('button');
  logoutBtn.innerText = 'Log out';
  logoutBtn.setAttribute('id', 'logoutBtn');
  logoutBtn.addEventListener('click', signOutUser);

  userDetails.appendChild(logoutBtn);

  // Test query button

  const queryBtn = document.createElement('button');
  queryBtn.textContent = 'Test query';
  queryBtn.addEventListener('click', fetchProject);
  projectsDiv.appendChild(queryBtn);
}

function clearSideBar() {
  const sideBar = document.getElementById('sideBar');
  sideBar.innerHTML = '';
  const title = document.createElement('h1');
  title.innerText = 'Do It!';
  sideBar.appendChild(title);
}

export function makeProjectBtn(id, name) {
  const projectsDiv = document.getElementById('projectsDiv');

  if (!document.getElementById(id)) {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.innerText = name;
    btn.addEventListener('click', (e) => {
      fetchProject(e.target.id);
    });
    projectsDiv.appendChild(btn);
  }
}

export function removeProjectBtn(id) {
  const projectsDiv = document.getElementById('projectsDiv');
  const projectBtn = document.getElementById(id);
  projectsDiv.removeChild(projectBtn);
}

function newProject() {
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
  addBtn.addEventListener('click', saveProject);
  addBtn.classList.add('addBtn');
  frame.appendChild(addBtn);
}

export function showTasks() {
  createFrame('New Project');
  var frame = document.getElementById('taskFrame');
  frame.classList.add('taskFrame');

  const para = document.createElement('p');
  para.innerText = 'You are here';
  frame.appendChild(para);
}

export function makeProjectOverview(project) {
  main.innerHTML = '';
  console.log(project);
  createFrame(project.projectName);
  const frame = document.getElementById('taskFrame');
  const addTaskbtn = document.createElement('button');
  addTaskbtn.innerText = 'Add task';
  addTaskbtn.addEventListener('click', () => taskForm(project.projectName));

  frame.appendChild(addTaskbtn);

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
  frame.appendChild(table);

  project.tasks.forEach((task) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.innerText = task.description;
    row.appendChild(titleCell);

    const dateCell = document.createElement('td');
    dateCell.innerText = format(new Date(task.dueDate * 1000), 'EE. do MMM');
    row.appendChild(dateCell);

    const priorityCell = document.createElement('td');
    priorityCell.innerText = task.priority;
    row.appendChild(priorityCell);

    const completeCell = document.createElement('td');
    if (task.complete) {
      completeCell.innerText = 'Yes';
    } else {
      completeCell.innerText = 'No';
    }
    row.appendChild(completeCell);

    table.appendChild(row);
  });
}

function taskForm(projectName) {
  main.innerHTML = '';
  var headerText = `New Task in ${projectName}`;
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
    option.innerText = level;
    priority.appendChild(option);
  }
  formInputs.appendChild(priorityLabel);
  formInputs.appendChild(priority);

  var btns = document.createElement('div');
  btns.classList.add('taskBtns');
  var addBtn = document.createElement('button');
  addBtn.innerText = 'Add Task';
  addBtn.setAttribute('id', 'addBtn');
  addBtn.addEventListener('click', () => saveTask(projectName));
  btns.appendChild(addBtn);

  var goBackBtn = document.createElement('button');
  goBackBtn.innerText = 'Go Back';
  btns.appendChild(goBackBtn);
  frame.appendChild(btns);
}
