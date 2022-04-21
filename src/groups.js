export default class Groups {
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
