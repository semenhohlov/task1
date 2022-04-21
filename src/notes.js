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
        this.modalWindow('Редагувати нотаток', this.form(item));
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
    const form = document.createElement('form');
    const inputSelect = document.createElement('select');
    const inputText = document.createElement('input');
    const inputSubmit = document.createElement('input');
    inputSelect.append(new Option('Завдання', '1'));
    inputSelect.append(new Option('Думки', '2'));
    inputSelect.append(new Option('Ідеї', '3'));
    if (item) {
      inputText.value = item.content;
      inputSelect.value = item.group_id;
    }
    inputSubmit.type = 'submit';
    inputSubmit.value = 'Додати';
    const div1 = document.createElement('div');
    div1.classList.add('row');
    div1.classList.add('mb-1');
    div1.innerHTML = 'Групи: ';
    div1.insertAdjacentElement('beforeend', inputSelect);
    form.insertAdjacentElement('beforeend', div1);
    const div2 = document.createElement('div');
    div2.classList.add('row');
    div2.classList.add('mb-1');
    div2.innerHTML = 'Нотаток: ';
    div2.insertAdjacentElement('beforeend', inputText);
    form.insertAdjacentElement('beforeend', div2);
    const div3 = document.createElement('div');
    div3.classList.add('row');
    div3.classList.add('mb-1');
    div3.classList.add('center');
    div3.insertAdjacentElement('beforeend', inputSubmit);
    form.insertAdjacentElement('beforeend', div3);
    inputSubmit.onclick = (event) => {
      event.preventDefault();
      const content = inputText.value.trim();
      if (!content){
        return;
      }
      if (!item) {
        const note = {
          group_id: parseInt(inputSelect.value),
          content,
          archived: false,
          updated_at: []
        }
        this.addNote(note);
      } else {
        item.content = content;
        item.group_id = parseInt(inputSelect.value);
        this.updateNote(item);
      }
      //closeModal
      const modalClose = document.querySelector('#modal-close');
      modalClose.click();
    };
    return form;
  }
};
