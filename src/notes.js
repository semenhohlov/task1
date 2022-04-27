export default class Notes {
  constructor(getState, content, addNote,deleteNote, updateNote, modalWindow) {
    this.items = [];
    this.getState = getState;
    this.content = content;
    this.addNote = addNote;
    this.deleteNote = deleteNote;
    this.updateNote = updateNote;
    this.img = ['task', 'thought', 'idea'];
    this.modalWindow = modalWindow;
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
    if (!this.items.length) {
      this.content.innerHTML = 'Записи відсутні.';
    }
    this.items.forEach(item => {
      const div = document.createElement('div');
      const divFlex = document.createElement('div');
      const divContent = document.createElement('div');
      const divMenu = document.createElement('div');
      divFlex.classList.add('flex');
      divFlex.classList.add('content-space-between');
      item.editHandler = (event) => {
        event.preventDefault();
        const modal = this.modalWindow({
          title: 'Редагувати нотаток',
          content: this.form(item),
          buttons: [
            {
              title: 'Зберегти',
              className: 'btn',
              handle: this.save.bind(this)
            }
          ]
        });
        modal.open();
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
      const date = new Date(Date.now());
      date.setTime(item.created_at);
      let content = `${item.content} ${date.toLocaleDateString()}`;
      if (item.updated_at.length) {
        item.updated_at.forEach(d => {
          date.setTime(d);
          content += ` [${date.toLocaleDateString()}]`;
        });
      }
      divContent.innerHTML = content;
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
      divMenu.insertAdjacentElement('beforeend', editBtn);
      divMenu.insertAdjacentElement('beforeend', archiveBtn);
      divMenu.insertAdjacentElement('beforeend', deleteBtn);

      divFlex.insertAdjacentElement('beforeend', divContent);
      divFlex.insertAdjacentElement('beforeend', divMenu);
      div.insertAdjacentElement('beforeend', divFlex);
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
  form(item = null) {
    const content = item ? item.content : '';
    const created_at = item ? `<input type="hidden" name="created_at" value="${item.created_at}" />` : '';
    const options = ['Завдання', 'Думки','Ідеї'].map((it, i) => {
      return `<option value="${i + 1}" ${(item && (item.group_id === (i + 1))) ? 'selected' : ''}>${it}</option>`;
    }).join('');
    const formContent = `
      <form>
        ${created_at}
        <div class="mb-1">
          Групи:
          <select name="group">${options}</select>
        </div>
        <div class="mb-1">
          <input type="text" name="name" value="${content}" />
        </div>
      </form>
    `;
    return formContent;
  }
  save() {
    const form = document.querySelector('form');
    this.updateNote({
      created_at: +form[0].value,
      group_id: +form[1].value,
      content: form[2].value,
      updated_at: []
    });
  }
  add() {
    const form = document.querySelector('form');
    this.addNote({group_id: +form[0].value, content: form[1].value, updated_at: []});
  }
};
