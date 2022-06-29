
import { filterTasks } from './storage.js';
import { test } from './domEvents.js'


// Run this snippet each time any of the projects are clicked on passing in the clicked project name as the argument
// It will cycle through and display the associated ones;




var cowBtn = document.getElementById('cowBtn');

var defaultBtn = document.getElementById('defaultBtn');



cowBtn.addEventListener('click', filterTasks);
defaultBtn.addEventListener('click', filterTasks);

document.getElementById('testBtn').addEventListener('click', test)







  



















