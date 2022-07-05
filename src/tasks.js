// Returns task object

export function task(title, description, priority, dueDate) {
  var completed = false;
  return {title, description, priority, dueDate, completed}
}
