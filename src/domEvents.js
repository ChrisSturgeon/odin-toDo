import { task } from './tasks.js'
import { projectNames, fetchTask, fetchProject, fetchTasks } from './projects.js'
import { testTasks } from './projects.js';

export function projectBtns() {
  var content = document.getElementById('sideBar');
  for (var project of projectNames()) {
    var btn = document.createElement('button');
    btn.innerText = project;
    btn.setAttribute('value', project);
    btn.addEventListener('click', testPrint);
    content.appendChild(btn);
  };
};

function testPrint() {
  var project = fetchProject ( this.value );
}

export function test() {
  console.log('test');
}