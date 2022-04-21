function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, {type: "__INIT__"});
  const subscribers = [];
  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach(sub => sub());
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    }
  };
}

const LOAD = 'LOAD';
const ADD_NOTE = 'ADD_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const SHOW_ARCHIVE = 'SHOW_ARCHIVE';
const SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP';

const initialState = {
  groups: [],
  notes: [],
  showArchive: false,
  activeGroup: null
};

export function rootReducer(state, action) {
  let notes = [...state.notes];
  switch (action.type) {
    case LOAD:
      return {...state, groups: [...action.payload.groups],
        notes: [...action.payload.notes]};
    case ADD_NOTE:
      notes.push(action.payload);
      return {...state, notes: [...notes]};
    case UPDATE_NOTE:
      notes = state.notes.map(item => {
        if (item.created_at === action.payload.created_at) {
          return action.payload;
        }
        return item;
      });
      return {...state, notes: [...notes]};
    case DELETE_NOTE:
      notes = state.notes.filter(item => {
        if (item.created_at !== action.payload) {
          return item;
        }
        return null;
      });
      return {...state, notes: [...notes]};
    case SHOW_ARCHIVE:
      return {...state, showArchive: !state.showArchive};
    case SET_ACTIVE_GROUP:
      return {...state, activeGroup: action.payload};
    default:
      return state;
  }
}

const store = createStore(rootReducer, initialState);

export function load(payload) {
  store.dispatch({type: LOAD, payload});
}
export function addNote(payload) {
  store.dispatch({type: ADD_NOTE, payload});
}
export function updateNote(payload) {
  store.dispatch({type: UPDATE_NOTE, payload});
}
export function deleteNote(payload) {
  store.dispatch({type: DELETE_NOTE, payload});
}
export function showArchive() {
  store.dispatch({type: SHOW_ARCHIVE});
}
export function setActiveGroup(payload) {
  store.dispatch({type: SET_ACTIVE_GROUP, payload});
}

export default store;
