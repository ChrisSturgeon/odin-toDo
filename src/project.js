import stringify from "fast-json-stable-stringify";

const projects = () => {
  const arr = [];
  return { arr };
}


function storageTest() {
  if (localStorage.getItem('projects') === null) {
    console.log('It was empty!');
    var projectObj = projects();
    projectObj.arr.push('cow', 'default', 'trains');
    window.localStorage.setItem('projects', stringify(projectObj))
  }
}

storageTest();




function projectsList() {
  return JSON.parse(localStorage.getItem('projects')).arr;
}

function newProject(name) {
  var projectObj = JSON.parse(localStorage.getItem('projects'));
  projectObj.arr.push(name);
  window.localStorage.setItem('projects', stringify(projectObj))
}


export { storageTest, projects, projectsList, newProject }
