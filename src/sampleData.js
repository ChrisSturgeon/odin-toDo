import { project, fetchProject } from './projects'
import { task } from './tasks.js'

import { saveProject } from "./projects";

export function sampleData() {
  if (localStorage.length == 0) {
    console.log('Local storage empty, loading sample data...')

    // Create example projects
    var cleaning = project();
    var coding = project();

    // Cleaning sample data
    cleaning.addTask(task('bathroom', 'low'));
    cleaning.addTask(task('kitchen', 'high'));
    cleaning.addTask(task('bedroom', 'medium'));
    cleaning.addTask(task('garage', 'medium'));
    saveProject('cleaning', cleaning);

    // Coding sample data
    coding.addTask(task('refactor', 'low'));
    coding.addTask(task('style', 'low'));
    coding.addTask(task('bug hunt', 'medium'));
    saveProject('coding', coding);

  };
};








