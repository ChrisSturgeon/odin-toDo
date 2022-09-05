import { welcomePage } from './domEvents.js';
import './style.css';
import { initializeApp } from 'firebase/app';
import { initFirebaseAuth, getUserName } from './userDomEvents.js';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHHMHBRk6S-sY23scMbOsklFKG4lEO2Jg',
  authDomain: 'odin-to-do.firebaseapp.com',
  projectId: 'odin-to-do',
  storageBucket: 'odin-to-do.appspot.com',
  messagingSenderId: '1003780039376',
  appId: '1:1003780039376:web:c4c385e1cd3c04b891f4d5',
};

const app = initializeApp(firebaseConfig);

welcomePage();

// async function saveProject() {
//   try {
//     await addDoc(collection(getFirestore(), 'projects'), {
//       name: getUserName(),
//       projectName: document.getElementById('projectInput').value,
//       tasks: [],
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     console.log('Error writing new project to Firebase Database', error);
//   }
// }

// const addProjectBtn = document.createElement('button');
// addProjectBtn.innerText = 'Add new project';
// addProjectBtn.addEventListener('click', saveProject);

// const sideBar = document.getElementById('sideBar');
// sideBar.appendChild(addProjectBtn);
