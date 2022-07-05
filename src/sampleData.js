import { makeProject } from './projects'
import { task } from './tasks.js';
import { saveProject } from "./projects";


export function loadBlankProject() {
  var startData = makeProject('default');
  saveProject('default', startData);
}; 


export function loadSampleData() {
  // Create example projects
  var cleaning = makeProject('cleaning');
  var coding = makeProject('project');
  var shopping = makeProject('shopping');

  var exampleDate = new Date();

  // Cleaning sample data
  cleaning.addTask(task('bathroom', 'clean the bathroom', 'low', exampleDate));
  cleaning.addTask(task('kitchen', ' clean the kitchen', 'high', exampleDate));
  cleaning.addTask(task('bedroom', 'clean the bedroom', 'medium', exampleDate));
  cleaning.addTask(task('garage', 'clean the garage', 'medium', exampleDate));
  saveProject('cleaning', cleaning);

  // Coding sample data
  coding.addTask(task('refactor', 'refactor this code', 'low', exampleDate));
  coding.addTask(task('style', 'style the project', 'low', exampleDate));
  coding.addTask(task('bug hunt', 'look for bugs in the code', 'medium', exampleDate));
  saveProject('coding', coding);

  // Shopping sample data
  shopping.addTask(task('Salt', 'buy some new table salt', 'low', exampleDate));
  shopping.addTask(task('Sunglasses', 'buy some new sunglasses', 'medium', exampleDate));
  shopping.addTask(task('batteries', 'buy some AAA batteries', 'high', exampleDate));
  saveProject('shopping', shopping);
};









