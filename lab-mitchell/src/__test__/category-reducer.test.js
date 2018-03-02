import reducer from '../reducers/category';
require('jest');

describe('category reducer', function() {
  it('should return initial state on first call', () => {
    expect(reducer([], {})).toEqual([]);
  });
  it('should handle CATEGORY_CREATE', () => {
    let categoryOne = {id: '1234', title: 'yooo', timestamp: new Date()};
    let categoryTwo = {id: '5678', title: 'gruu', timestamp: new Date()};

    let state = reducer([categoryOne], {
      type: 'CATEGORY_CREATE',
      payload: categoryTwo,
    });

    expect(state).toContain(categoryOne);
    expect(state).toContain(categoryTwo);
  });
  it('should handle CATEGORY_UPDATE', () => {
    let categoryOne = {id: '1234', title: 'yooo', timestamp: new Date()};
    let categoryTwoUpdate = {id: '1234', title: 'gruu'};

    let state = reducer([categoryOne], {
      type: 'CATEGORY_UPDATE',
      payload: categoryTwoUpdate,
    });

    expect(state.length).toEqual(1);
    expect(state[0]).toHaveProperty('id');
    expect(state[0]).toHaveProperty('title');
    expect(state[0].id).toEqual('1234');
    expect(state[0].title).toEqual('gruu');
  });
  it('should handle CATEGORY_DELETE', () => {
    let categoryOne = {id: '1234', title: 'yooo', timestamp: new Date()};
    let categoryTwoDelete = {id: '1234', title: 'yooo'};

    let state = reducer([categoryOne], {
      type: 'CATEGORY_DELETE',
      payload: categoryTwoDelete,
    });

    expect(state.length).toEqual(0);
    expect(state[0]).toBeUndefined();
  });
  it('should handle CATEGORY_RESET', () => {
    let categoryOne = {id: '1234', title: 'yooo', timestamp: new Date()};
    let categoryTwo = {id: '1234', title: 'gruu', timestamp: new Date()};

    let state = reducer([categoryOne, categoryTwo], {
      type: 'CATEGORY_RESET',
    });

    expect(state.length).toEqual(0);
    expect(state[0]).toBeUndefined();
  });
});