import { task } from './task.js';
import { project, cleanSink } from './project.js'

window.localStorage.clear();

var makeBed = task('make bed', 'Make the bloody bed yeah!');
var postShorts = task('post shorts', 'Return shorts to Surfdome');
var goWalk = task('go walking', 'go for a bloody nice walk');
var fixToilet = task('fix toilet', 'fix the fucking toilet');

function saveTask(task) {
  window.localStorage.setItem(`${task.title}`, JSON.stringify(task));
}

const allTasks = [makeBed, postShorts, goWalk, fixToilet];

allTasks.forEach(saveTask);




function getTask(name) {
  var test = JSON.parse(window.localStorage.getItem(name));
  fetchedTasks.push(test);
}

const fetchedTasks = [];

console.log(localStorage.length)

for (var i = 0; i < localStorage.length; i++) {
  var obj = JSON.parse(localStorage.getItem( localStorage.key( i )));
fetchedTasks.push(obj);
}

console.log(fetchedTasks);






// const allTasks = [JSON.stringify(makeBed), JSON.stringify(postShorts)];

// function addTask() {
//   // window.localStorage.setItem(postShorts);
//   window.localStorage.setItem('allTasks', allTasks);
// }


// function clearStorage() {
//   window.localStorage.clear();
// }













