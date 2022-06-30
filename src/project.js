import { fetchAll } from "./storage";

const project = (name) => {
  const items = [];
  const addTask = (task) => {
    items.push(task);
  }
  return { name, items, addTask };
}
