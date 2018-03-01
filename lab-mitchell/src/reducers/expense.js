let initialState = {};
//UNLIKE CATEGORY
//implicationis key value pairs, key being category, value being array of cards

// {
//   'id1234': [],
//   'id4567': [],
// }

export default (state=initialState, action) => { //initialState basically for page load
  let {type, payload} = action; //type of action we're dispatching, and payload

  switch(type) {
  //WE DON'T WANT TO GIVE ABILITY TO UPDATE ID HERE, SO WE JUST DON'T ALLOW UPDATES
  case 'CATEGORY_CREATE': return {...state, [payload.id]: []};
  case 'CATEGORY_DELETE':
    let changedState = {...state};
    // let changedState = state;
    delete changedState[payload.id]; //eliminates the whole thing 
    return changedState;
    // return {...changedState};

  case 'EXPENSE_CREATE': 
    // let categoryState = {...state};
    // // categoryState[payload.id] = categoryState[payload.id].push(payload);
    // categoryState[payload.id].push(payload);
    // return categoryState;
    state[payload.categoryId] = state[payload.categoryId].concat([payload]);
    return {...state};
  case 'EXPENSE_UPDATE': return state[payload.categoryId].map(
    expense => expense.id === payload.id ? payload : expense);
  case 'EXPENSE_DELETE': return state[payload.categoryId].filter(expense => expense.id !== payload.id);
  case 'EXPENSE_RESET': return initialState;
  default: return state;
  }
};