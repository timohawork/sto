import { combineReducers } from "redux";

function carsReducer(state = {}, action) {
  switch (action.type) {
    case 'INIT_CARS':
      return action.data;
    case 'ADD_CAR':
      return {...state, [action.data.id]: action.data};
    case 'EDIT_CAR':
      return Object.keys(state).map(key => {
        return state[key].id === action.data.id ? action.data : state[key];
      });
    case 'DEL_CAR':
      const {[action.id]: value, ...reduced} = state;
      return reduced;
    default:
      return state;
  }
}

function empsReducer(state = {}, action) {
  switch (action.type) {
    case 'INIT_EMPS':
      return action.data;
    case 'ADD_EMP':
      return {...state, [action.data.id]: action.data};
    case 'EDIT_EMP':
      return Object.keys(state).map(key => {
        return state[key].id === action.data.id ? action.data : state[key];
      });
    case 'DEL_EMP':
      const {[action.id]: value, ...reduced} = state;
      return reduced;
    default:
      return state;
  }
}

function tasksReducer(state = [], action) {
  switch (action.type) {
    case 'INIT_TASKS':
      return action.data;
    case 'ADD_TASK':
      return [...state, action.data];
    case 'EDIT_TASK':
      return state.map(task => {
        return task.id === action.data.id ? action.data : task;
      });
    case 'DEL_TASK':
      return state.filter(task => task.id !== action.id);
    default:
      return state;
  }
}

function sparesReducer(state = {}, action) {
  switch (action.type) {
    case 'INIT_SPARES':
      return action.data;
    case 'ADD_SPARE':
      return {...state, [action.data.id]: action.data};
    case 'EDIT_SPARE':
      return Object.keys(state).map(key => {
        return state[key].id === action.data.id ? action.data : state[key];
      });
    case 'DEL_SPARE':
      const {[action.id]: value, ...reduced} = state;
      return reduced;
    default:
      return state;
  }
}


export default combineReducers({
  cars: carsReducer,
  emps: empsReducer,
  tasks: tasksReducer,
  spares: sparesReducer
});