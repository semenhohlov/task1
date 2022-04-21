import DataLoader from './data.js';
import Store, {load, addNote, updateNote, deleteNote,
  showArchive, setActiveGroup} from './reducer.js';
import Groups from './groups.js';
import Notes from './notes.js';
import modalWindow from './modal.js';

function start() {
  const data = DataLoader.load();
  load(data);
  const groupsContent = document.querySelector('#groupsContent');
  const addButton = document.querySelector('#addButton');
  const allButton = document.querySelector('#allButton');
  allButton.addEventListener('click', () => {setActiveGroup();});
  const archiveButton = document.querySelector('#archiveButton');
  archiveButton.addEventListener('click', () => {showArchive();});
  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const state = Store.getState();
    DataLoader.save({groups: [...state.groups], notes: [...state.notes]});
  });
  const gr = new Groups(Store.getState, groupsContent, setActiveGroup, archiveButton, allButton);
  gr.show();
  const notesContent = document.querySelector('#notesContent');
  const nt = new Notes(Store.getState, notesContent, addNote, deleteNote, updateNote, modalWindow);
  addButton.addEventListener('click', () => {
    modalWindow('Новий нотаток', nt.form());
  });
  nt.show();
  Store.subscribe(gr.update.bind(gr));
  Store.subscribe(nt.update.bind(nt));
}

window.onload = start;
