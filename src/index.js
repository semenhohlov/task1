import DataLoader from './data.js';
import Store, {load, addNote, updateNote, deleteNote,
  showArchive, setActiveGroup} from './reducer.js';

class Groups {
  constructor(getState, content, setActive) {
    this.items = [];
    this.getState = getState;
    this.content = content;
    this.setActive = setActive;
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
    const notes = this.getState().notes;
    this.items = this.getState().groups;
    this.items.forEach(item => {
      const div = document.createElement('div');
      item.clickHandler = (event) => {
        event.preventDefault();
        this.setActive(item);
        console.log('click group_id', item.group_id);
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
    console.log('update');
    // remove all listeners
    this.items.forEach(item => {
      item.div.removeEventListener('click', item.clickHandler);
    });
    this.content.innerHTML = '';
    this.show();
  }
};

class Notes {
  constructor(getState, content, setActive) {
    this.items = [];
    this.getState = getState;
    this.content = content;
    this.setActive = setActive;
    this.img = ['task', 'thought', 'idea'];
  }
  show() {
    this.items = this.getState().notes;
    const activeGroup = this.getState().activeGroup;
    if (activeGroup) {
      this.items = this.items.filter(item => item.group_id === activeGroup.group_id);
    }
    this.items.forEach(item => {
      const div = document.createElement('div');
      item.clickHandler = (event) => {
        event.preventDefault();
        this.setActive(item);
        console.log('click note', item.content);
      };
      item.div = div;
      div.classList.add('note-item');
      div.classList.add(this.img[item.group_id - 1]);
      div.innerHTML = item.content;
      div.addEventListener('click', item.clickHandler);
      this.content.insertAdjacentElement('beforeend', div);
    });
  }
  update() {
    console.log('update');
    // remove all listeners
    this.items.forEach(item => {
      item.div.removeEventListener('click', item.clickHandler);
    });
    this.content.innerHTML = '';
    this.show();
  }
};

function start() {
  const data = DataLoader.load();
  load(data);
  const groupsContent = document.querySelector('#groupsContent');
  const gr = new Groups(Store.getState, groupsContent, setActiveGroup);
  gr.show();
  const notesContent = document.querySelector('#notesContent');
  const nt = new Notes(Store.getState, notesContent, setActiveGroup);
  nt.show();
  Store.subscribe(gr.update.bind(gr));
  Store.subscribe(nt.update.bind(nt));
}

window.onload = start;
