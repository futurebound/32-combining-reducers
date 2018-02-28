// import React from 'react';
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
});