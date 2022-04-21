import DataLoader from './data.js';
import Store, {load, addNote, updateNote, deleteNote,
  showArchive, setActiveGroup} from './reducer.js';

class Groups {
  constructor(getState, content, setActive, archiveButton, allButton) {
    this.items = [];
    this.getState = getState;
    this.content = content;
    this.setActive = setActive;
    this.archiveButton = archiveButton;
    this.allButton = allButton;
    this.img = ['task', 'thought', 'idea'];
  }
  getNotesCount(items, group_id, isArchived = false) {
    if (isArchived) {
      return items.filter(item => {
        if ((item.group_id === group_id) && (item.archived)) {
          return item;
        }
        return;
      }).length;
    }
    return items.filter(item => item.group_id === group_id).length;
  }
  show() {
    const activeGroup = this.getState().activeGroup;
    this.allButton.className = activeGroup ? 'btn' : 'btn btn-on';
    this.archiveButton.className = this.getState().showArchive ? 'btn btn-on' : 'btn';
    const notes = this.getState().notes;
    this.items = this.getState().groups;
    this.items.forEach(item => {
      const div = document.createElement('div');
      item.clickHandler = (event) => {
        event.preventDefault();
        this.setActive(item);
      };
      item.div = div;
      div.classList.add('group-item');
      div.classList.add(this.img[item.group_id - 1]);
      if (activeGroup && (activeGroup.group_id === item.group_id)) {
        div.classList.add('active');
      }
      div.innerHTML = item.group_name + ' '+
        this.getNotesCount(notes, item.group_id, false)
        + ' / ' + this.getNotesCount(notes, item.group_id, true);
      div.addEventListener('click', item.clickHandler);
      this.content.insertAdjacentElement('beforeend', div);
    });
  }
  update() {
    // remove all listeners
    this.items.forEach(item => {
      item.div.removeEventListener('click', item.clickHandler);
    });
    this.content.innerHTML = '';
    this.show();
  }
};

class Notes {
  constructor(getState, content, deleteNote, updateNote) {
    this.items = [];
    this.getState = getState;
    this.content = content;
    this.deleteNote = deleteNote;
    this.updateNote = updateNote;
    this.img = ['task', 'thought', 'idea'];
  }
  show() {
    this.items = this.getState().notes.filter(item => !item.archived);
    if (this.getState().showArchive) {
      this.items = this.getState().notes.filter(item => item.archived);
    }
    const activeGroup = this.getState().activeGroup;
    if (activeGroup) {
      this.items = this.items.filter(item => item.group_id === activeGroup.group_id);
    }
    this.items.forEach(item => {
      const div = document.createElement('div');
      item.editHandler = (event) => {
        event.preventDefault();
        console.log('edit note', item.content);
      };
      item.archiveHandler = (event) => {
        event.preventDefault();
        const tmpItem = {...item};
        tmpItem.archived = !tmpItem.archived;
        this.updateNote(tmpItem);
      };
      item.deleteHandler = (event) => {
        event.preventDefault();
        this.deleteNote(item.created_at);
      };
      item.div = div;
      div.classList.add('note-item');
      div.classList.add(this.img[item.group_id - 1]);
      div.innerHTML = item.content;
      // buttons
      const editBtn = document.createElement('button');
      const archiveBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      editBtn.classList.add('note-item-btn');
      editBtn.classList.add('btn-edit');
      archiveBtn.classList.add('note-item-btn');
      if (item.archived) {
        archiveBtn.classList.add('btn-unarchive');
      } else {
        archiveBtn.classList.add('btn-archive');
      }
      deleteBtn.classList.add('note-item-btn');
      deleteBtn.classList.add('btn-delete');
      item.editBtn = editBtn;
      item.archiveBtn = archiveBtn;
      item.deleteBtn = deleteBtn;
      editBtn.addEventListener('click', item.editHandler);
      archiveBtn.addEventListener('click', item.archiveHandler);
      deleteBtn.addEventListener('click', item.deleteHandler);
      div.insertAdjacentElement('beforeend', editBtn);
      div.insertAdjacentElement('beforeend', archiveBtn);
      div.insertAdjacentElement('beforeend', deleteBtn);

      this.content.insertAdjacentElement('beforeend', div);
    });
  }
  update() {
    // remove all listeners
    this.items.forEach(item => {
      item.editBtn.removeEventListener('click', item.editHandler);
      item.archiveBtn.removeEventListener('click', item.archiveHandler);
      item.deleteBtn.removeEventListener('click', item.deleteHandler);
    });
    this.content.innerHTML = '';
    this.show();
  }
};

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
  const nt = new Notes(Store.getState, notesContent, deleteNote, updateNote);
  nt.show();
  Store.subscribe(gr.update.bind(gr));
  Store.subscribe(nt.update.bind(nt));
}

window.onload = start;
