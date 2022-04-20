import DataLoader from './data.js';
import Store, {load, addNote, updateNote, deleteNote,
  showArchive, setActiveGroup} from './reducer.js';

function start() {
  const data = DataLoader.load();
  Store.dispatch(load(data));
  const groups = Store.getState().groups;
  const notes = Store.getState().notes;
  const groupsContent = document.querySelector('#groupsContent');
  const notesContent = document.querySelector('#notesContent');
  groups.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = item.group_name;
    groupsContent.insertAdjacentElement('beforeend', div);
  });
  notes.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = item.content;
    notesContent.insertAdjacentElement('beforeend', div);
  });
}

window.onload = start;
