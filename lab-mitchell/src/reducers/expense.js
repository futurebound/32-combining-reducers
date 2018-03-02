let initialState = {};

export default (state=initialState, action) => {
  let {type, payload} = action;

  switch(type) {
  case 'CATEGORY_CREATE': return {...state, [payload.id]: []};
  case 'CATEGORY_DELETE':
    let changedState = {...state};
    delete changedState[payload.id];
    return changedState;

  case 'EXPENSE_CREATE': 
    state[payload.categoryId] = state[payload.categoryId].concat([payload]);
    return {...state};
  case 'EXPENSE_UPDATE': 
    let categoryStateUpdate = state[payload.categoryId].map(
      expense => expense.id === payload.id ? payload : expense);
    return {...state, [payload.categoryId]: categoryStateUpdate};
  case 'EXPENSE_DELETE': 
    let categoryStateDelete = state[payload.categoryId].filter(
      expense => expense.id !== payload.id);
    return {...state, [payload.categoryId]: categoryStateDelete};
  case 'EXPENSE_RESET': return initialState;
  default: return state;
  }
};