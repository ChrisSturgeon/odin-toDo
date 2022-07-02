
// Project obj factory function.
export function project() {
  var name = name;  var arr = [];
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
  }
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

export function completeTask() {
  var arr = (this.value).split(' + ')
  var projectName = arr[0];
  var taskName = arr[1];

  var project = fetchProject(projectName);
  for (var task of project.arr) {
    if (task['title'] == taskName) {
      console.log(task['completed']);
      if (task['completed'] == false) {
        task['completed'] = true;
        console.log(task['completed']);
        saveProject(projectName, project);
      } else {
        task['completed'] = false;
        console.log(task['completed']);
        saveProject(projectName, project);
      }
    };
  };
};


