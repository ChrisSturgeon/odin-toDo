
const project = (name) => {
  const items = [];
  const addTask = (task) => {
    items.push(task);
  }
  return { name, items, addTask };
}

var cleanSink = project('Clean Sink');

export { project, cleanSink }