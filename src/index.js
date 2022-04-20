import DataLoader from './data.js';


function start() {
  const data = DataLoader.load();
  const groups = data.groups;
  const notes = data.notes;
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
