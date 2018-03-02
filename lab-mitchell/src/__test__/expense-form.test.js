import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpenseForm from '../components/expense/expense-form/expense-form';
require('jest');

configure({adapter: new Adapter()});

describe('<ExpenseForm />', function () {
  describe('#shallow mounting', function () {
    beforeAll(() => this.wrapper = shallow(<ExpenseForm />));
    afterAll(() => this.wrapper.unmount());

    it('should render a expense form component', () => {
      expect(this.wrapper.length).toEqual(1);
      expect(this.wrapper.find('.expense-form').length).toEqual(1);
    });
    it('should have a default state object with a title property assigned an empty string', () => {
      expect(this.wrapper.state().name).toEqual('');
      expect(this.wrapper.state().cost).toEqual('');
    });
    it('should change the state object when form input is provided', () => {
      this.wrapper.find(`.expense-form input[name='name']`).simulate('change', {target: {name: 'name', value: 'hello'}});
      expect(this.wrapper.state().name).toEqual('hello');
    });
  });

  describe('#full mounting', function () {
    beforeAll(() => {
      this.wrapper = mount(<ExpenseForm />);
      this.wrapper.setProps({onComplete: jest.fn()});
    });
    afterAll(() => this.wrapper.unmount());

    it('should reset the state.title value to empty string on form submit', () => {
      this.wrapper.setState({name: 'thename'});
      this.wrapper.setState({cost: 222});
      expect(this.wrapper.state().name).toEqual('thename');
      expect(this.wrapper.state().cost).toEqual(222);
      this.wrapper.simulate('submit', {preventDefault: () => {}});
      expect(this.wrapper.state().name).toEqual('');
      expect(this.wrapper.state().cost).toEqual('');
    });
    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});