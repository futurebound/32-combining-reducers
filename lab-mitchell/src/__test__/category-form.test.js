import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryForm from '../components/category/category-form/category-form';
require('jest');

configure({adapter: new Adapter()});

describe('<CategoryForm />', function () {
  describe('#shallow mounting', function () {
    beforeAll(() => this.wrapper = shallow(<CategoryForm />));

    it('should render a category form component', () => {
      expect(this.wrapper.length).toEqual(1);
      expect(this.wrapper.find('.category-form').length).toEqual(1);
    });
    it('should have a default state object with a title property assigned an empty string', () => {
      expect(this.wrapper.state().title).toEqual('');
    });
    it('should change the state object when form input is provided', () => {
      this.wrapper.find('.category-form input').simulate('change', {target: {name: 'title', value: 'hello'}});
      expect(this.wrapper.state().title).toEqual('hello');
    });
  });

  describe('#full mounting', function () {
    beforeAll(() => {
      this.wrapper = mount(<CategoryForm />);
      this.wrapper.setProps({onComplete: jest.fn()});
    });
    afterAll(() => this.wrapper.unmount());

    it('should reset the state.title value to empty string on form submit', () => {
      this.wrapper.setState({title: 'hoobidy'});
      expect(this.wrapper.state().title).toEqual('hoobidy');
      this.wrapper.simulate('submit', {preventDefault: () => {}});
      expect(this.wrapper.state().title).toEqual('');
    });
    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});