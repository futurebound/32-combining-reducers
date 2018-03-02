import reducer from '../reducers/expense';
require('jest');

describe('expense reducer', function () {
  it('should return initial state on first call', () => {
    expect(reducer([], {})).toEqual([]);
  });
  it('should handle EXPENSE_CREATE', () => {
    let expenseOne = {categoryId: '22', id: '1234', name: 'yooo', cost: 22, timestamp: new Date()};
    let expenseTwo = {categoryId: '22', id: '5678', name: 'gruu', cost: 33, timestamp: new Date()};
    let previousState = {
      '22': [expenseOne],
    };

    let state = reducer(previousState, {
      type: 'EXPENSE_CREATE',
      payload: expenseTwo,
    });

    expect(state[22].length).toEqual(2);
    expect(state[22]).toContain(expenseOne);
    expect(state[22]).toContain(expenseTwo);
    expect(state[22][0].id).toEqual('1234');
    expect(state[22][1].id).toEqual('5678');
  });
  it('should handle EXPENSE_UPDATE', () => {
    let expenseOne = {categoryId: '22', id: '1234', name: 'yooo', cost: 22, timestamp: new Date()};
    let expenseTwoUpdate = {categoryId: '22', id: '1234', name: 'gruu', cost: 33, timestamp: new Date()};
    let previousState = {
      '22': [expenseOne],
    };

    let state = reducer(previousState, {
      type: 'EXPENSE_UPDATE',
      payload: expenseTwoUpdate,
    });

    expect(state[22].length).toEqual(1);
    expect(state[22]).toContain(expenseTwoUpdate);
    expect(state[22][0]).toHaveProperty('id');
    expect(state[22][0]).toHaveProperty('name');
    expect(state[22][0]).toHaveProperty('cost');
    expect(state[22][0].id).toEqual('1234');
    expect(state[22][0].name).toEqual('gruu');
    expect(state[22][0].cost).toEqual(33);
  });
  it('should handle EXPENSE_DELETE', () => {
    let expenseOne = {categoryId: '22', id: '1234', name: 'yooo', cost: 22, timestamp: new Date()};
    let expenseTwoDelete = {categoryId: '22', id: '1234', name: 'yooo', cost: 22, timestamp: new Date()};
    let previousState = {
      '22': [expenseOne],
    };

    expect(previousState[22].length).toEqual(1);

    let state = reducer(previousState, {
      type: 'EXPENSE_DELETE',
      payload: expenseTwoDelete,
    });

    expect(state[22].length).toEqual(0);
    expect(state[22][0]).toBeUndefined();
  });
  it('should handle EXPENSE_RESET', () => {
    let expenseOne = {categoryId: '22', id: '1234', name: 'yooo', cost: 22, timestamp: new Date()};
    let expenseTwo = {categoryId: '22', id: '5678', name: 'gruu', cost: 33, timestamp: new Date()};
    let previousState = {
      '22': [expenseOne, expenseTwo],
    };

    expect(previousState[22].length).toEqual(2);

    let state = reducer(previousState, {
      type: 'EXPENSE_RESET',
    });

    expect(state).toEqual({});
    expect(state[22]).toBeUndefined();
  });
});