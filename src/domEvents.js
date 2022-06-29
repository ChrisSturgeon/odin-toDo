import { task } from './task.js';
import { saveTask } from './storage.js';


function test() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var tempTask = task(title, description);
  saveTask(tempTask);
}

export { test };

