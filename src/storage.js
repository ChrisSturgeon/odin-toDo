import { task } from './task.js';
// All functions relating to saving and fetching from localStorage

// Sample Data 
var makeBed = task('make bed', 'Make the bloody bed yeah!');
var postShorts = task('post shorts', 'Return shorts to Surfdome');
var goWalk = task('go walking', 'go for a bloody nice walk', 'cow');
var fixToilet = task('fix toilet', 'fix the fucking toilet');
var shoutLoud = task('shout loud', 'shout as loud as I can', 'cow');
var stopTrain = task('stop train', 'engage beast mode and stop a bloody train', 'trains')

const allTasks = [makeBed, postShorts, goWalk, fixToilet, shoutLoud, stopTrain];

allTasks.forEach(saveTask);

// Stores individual task in localStorage.
function saveTask(task) {
  window.localStorage.setItem(`${task.title}`, JSON.stringify(task));
}

// Fetches and returns all tasks in array.
function fetchAll() {
  const fetchedTasks = [];
  for (var i = 0; i < localStorage.length; i++) {
    var obj = JSON.parse(localStorage.getItem( localStorage.key( i )));
    fetchedTasks.push(obj);
  };
  return fetchedTasks;
}

// Filters all stored tasks by provided project name passed by button value. 
function filterTasks() {
  var allTasks = fetchAll();
  var projectName = this.value;
  var relatedTasks = [];
  for (var task of allTasks) {
    if (task.project === projectName) {
      relatedTasks.push(task);
      }
    };
  console.log(relatedTasks);
  return relatedTasks;
};

// Returns list of unique project names
function getProjectNames() {
  var projectNames = [];
  var allTasks = fetchAll();
  for (var task of allTasks) {

    if (!projectNames.includes(task.project)) {
      projectNames.push(task.project)
    }; 
  };
  return projectNames;
}

// Deletes item from local storage 
function removeItem(title) {
  localStorage.removeItem(title);
}




export { saveTask, fetchAll, filterTasks, getProjectNames };

