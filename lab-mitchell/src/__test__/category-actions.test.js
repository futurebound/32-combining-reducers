import * as actions from '../actions/category-actions';
require('jest');

describe('#cateory actions', function() {
  it('should create an action to add a category', () => {
    let category = {title: 'hello'};
    let action = actions.categoryCreate(category);

    expect(action.type).toEqual('CATEGORY_CREATE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload).toHaveProperty('timestamp');
  });
  it('should create an action to update a category', () => {
    let category = {id: 'blue', title: 'ronaldo'};
    let action = actions.categoryUpdate(category);

    expect(action.type).toEqual('CATEGORY_UPDATE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.id).toEqual('blue');
    expect(action.payload).toHaveProperty('title');
    expect(action.payload.title).toEqual('ronaldo');
  });
  it('should create an action to delete a category', () => {
    let category = {id: 'red', title: 'reginald'};
    let action = actions.categoryDelete(category);

    expect(action.type).toEqual('CATEGORY_DELETE');
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.id).toEqual('red');
    expect(action.payload).toHaveProperty('title');
    expect(action.payload.title).toEqual('reginald');
  });
  it('should create an action to reset categories', () => {
    let action = actions.categoryReset();

    expect(action.type).toEqual('CATEGORY_RESET');
  });
});