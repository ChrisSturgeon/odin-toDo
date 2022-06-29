const task = (title, description, dueDate, priority, project = "default" ) => {
  var completed = false;
  return { title, description, completed, dueDate, priority, project };
}

export { task }