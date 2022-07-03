
import {  refreshTasks } from "./domEvents";

// Project obj factory function.
export function project() {
  var arr = [];
  function addTask(task) {
    this.arr.push(task);
  }
  return { arr, addTask }
};

// Saves project in local storage.
export function saveProject(key, value) {
  window.localStorage.setItem(`${key}`, JSON.stringify(value));
}

// Retrieves project from local storage and adds methods.
export function fetchProject(name) {
  project = JSON.parse(window.localStorage.getItem(name));
  project.addTask = function(name) {
    this.arr.push(name)
  };
  project.removeTask = function(name) {
    this.arr = this.arr.filter(task => task['title'] !== name); 
  };

  project.addTask = function(taskName) {
    this.arr.push(taskName);
  };

  project.toggleComplete = function(taskName) {
    for (var task of this.arr) {
      if (task['title'] == taskName) {
        if (task['completed'] == false) {
          task['completed'] = true;
        } else {
          task['completed'] = false;
        };
        console.log(task['completed']);  
      };
    };
  };

  project.fetchTask = function(taskName) {
    for (var task of this.arr) {
      if (task['title'] == taskName) {
        return task;
      }
    };
  };

  project.findIndex = function(taskName) {
     return (this.arr.findIndex(task => task['title'] == taskName));
  };
    return project;
  };


// Returns array of project names in local storage.
export function projectNames() {
  var nameArr = [];
  for (var i = 0; i < localStorage.length; i++) {
    nameArr.push((localStorage.key(i)));
  };
  return nameArr;
}

// Toggles task completion
export function completeTask() {
  var arr = (this.value).split(' + ')
  var projectName = arr[0];
  var taskName = arr[1];

  var project = fetchProject(projectName);
  project.toggleComplete(taskName);
  saveProject(projectName, project);
  refreshTasks();

};

// Removes task from project's task array
export function removeTask() {
  var arr = (this.value).split(' + ')
  var projectName = arr[0];
  var taskName = arr[1];
  var project = fetchProject(projectName);
  project.removeTask(taskName);
  saveProject(projectName, project);
  refreshTasks();
};





