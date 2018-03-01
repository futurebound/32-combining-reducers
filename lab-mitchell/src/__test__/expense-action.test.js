import * as actions from '../actions/expense-actions';
require('jest');

describe('#cateory actions', function () {
  it('should create an action to add a expense', () => {
    let expense = {title: 'hello'};
    let action = actions.expenseCreate(expense);

    expect(action.type).toEqual('EXPENSE_CREATE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload).toHaveProperty('timestamp');
  });
  it('should create an action to update a expense', () => {
    let expense = {id: 'blue', title: 'ronaldo'};
    let action = actions.expenseUpdate(expense);

    expect(action.type).toEqual('EXPENSE_UPDATE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.id).toEqual('blue');
    expect(action.payload).toHaveProperty('title');
    expect(action.payload.title).toEqual('ronaldo');
  });
  it('should create an action to delete a expense', () => {
    let expense = {id: 'red', title: 'reginald'};
    let action = actions.expenseDelete(expense);

    expect(action.type).toEqual('EXPENSE_DELETE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.id).toEqual('red');
    expect(action.payload).toHaveProperty('title');
    expect(action.payload.title).toEqual('reginald');
  });
  it('should create an action to reset categories', () => {
    let action = actions.expenseReset();

    expect(action.type).toEqual('EXPENSE_RESET');
  });
});