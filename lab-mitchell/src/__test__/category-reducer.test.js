import reducer from '../reducers/category';
require('jest');

describe('category reducer', function() {
  it('should return initial state on firsts call', () => {
    // REDUCER() WHEN CALLED EXPECTS AN ACTION TO BE PASSED
    expect(reducer([], {})).toEqual([]);
  });
  it('should handle CATEGORY_CREATE', () => {
    let categoryOne = { id: '1234', title: 'yooo', timestamp: new Date() };
    let categoryTwo = { id: '5678', title: 'gruu', timestamp: new Date() };

    let state = reducer([categoryOne], {
      type: 'CATEGORY_CREATE',
      payload: categoryTwo,
    });

    expect(state).toContain(categoryOne);
    expect(state).toContain(categoryTwo);
  });
});