const task = (title, description, project = "default", dueDate, priority, ) => {
  var completed = false;
  return { title, description, completed, dueDate, priority, project };
}

export { task }