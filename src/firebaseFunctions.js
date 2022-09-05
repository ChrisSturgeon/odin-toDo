import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';

import {
  getUserName,
  showTasks,
  makeProjectBtn,
  removeProjectBtn,
  logQuery,
  makeProjectOverview,
} from './userDomEvents';

export async function saveProject() {
  try {
    await addDoc(collection(getFirestore(), 'projects'), {
      name: getUserName(),
      projectName: document.getElementById('projectInput').value,
      tasks: [],
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log('Error writing new project to Firebase Database', error);
  }
}

export function fetchProjects() {
  const projectsQuery = query(collection(getFirestore(), 'projects'));

  onSnapshot(projectsQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === 'removed') {
        removeProjectBtn(change.doc.id);
      } else {
        var project = change.doc.data();
        makeProjectBtn(change.doc.id, project.projectName);
      }
    });
  });
}

export async function fetchProject(inputId) {
  const db = getFirestore();

  const projectQuery = query(
    collection(db, 'projects'),
    where('__name__', '==', inputId)
  );

  onSnapshot(projectQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === 'removed') {
        console.log('--- Data removed ---');
      } else {
        var project = change.doc.data();
        makeProjectOverview(project);
      }
    });
  });
}

// title: document.getElementById('title').value,
// description: document.getElementById('description').value,
// completed: false,
// dueDate: document.getElementById('dueDate').value,
// priority: document.getElementById('priority').value,
