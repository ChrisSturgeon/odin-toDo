import { project, fetchProject } from './projects'
import { task } from './tasks.js'

import { saveProject } from "./projects";

export function sampleData() {
  if (localStorage.length == 0) {
    console.log('Local storage empty, loading sample data...')

    // Create example projects
    var cleaning = project(cleaning);
    var coding = project(project);

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
  };
};








