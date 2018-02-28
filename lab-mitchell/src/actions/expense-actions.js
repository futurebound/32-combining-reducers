// WE DO DIS

import uuid from 'uuid/v4';

//ASSUMING THAT WE WILL BE PASSING expense AS AN ENTIRE OBJECT WITH CAPTURED FORM FIELD DATA, APPENDING ID AND TIMESTAMP ON IT, AND SENDING IT OFF TO THE STORE, PASSING THE ENTIRE expense THING AS THE PAYLOAD

export const expenseCreate = expense => {
  expense.id = uuid();
  expense.timestamp = new Date();
  return { // THIS IS THE ACTUAL ACTION, HAS TYPE AND PAYLOAD
    type: 'EXPENSE_CREATE',
    payload: expense,
  };
};

export const expenseUpdate = expense => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const expenseDelete = expense => ({
  type: 'EXPENSE_DELETE',
  payload: expense,
});

export const expenseReset = () => ({type: 'EXPENSE_RESET'});