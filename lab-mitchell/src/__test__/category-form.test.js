import React from 'react'; //alows jest/enzyme to use react library when it mounts component for us to test with
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import Enzyme, {shallow, mount} from 'enzyme';
import CategoryForm from '../components/category/category-form/category-form';
require('jest');

configure({adapter: new Adapter()});

describe('<CategoryForm />', function () {
  describe('#shallow mounting', function () {
    // next two essentially equivalent of starting/stopping server
    beforeAll(() => this.wrapper = shallow(<CategoryForm />));
    afterAll(() => this.wrapper.unmount()); //if we don't unmount might create side effects for DOM of test suite that could affect other tests

    it('should render a category form component', () => {
      expect(this.wrapper.length).toEqual(1);
      expect(this.wrapper.find('.category-form').length).toEqual(1);
    });
    it('should have a default state object with a title property assigned an empty string', () => {
      // .state() HOW WE FIND IT YOO
      expect(this.wrapper.state().title).toEqual('');
    });
    it('should change the state object when form input is provided', () => {
      //needs event, target name, target value for simulate
      //simulate data being passed as event object to our onChange function
      // let event = {target: {name: 'title', value: 'hello'}};
      this.wrapper.find('.category-form input').simulate('change', {target: {name: 'title', value: 'hello'}});
      expect(this.wrapper.state().title).toEqual('hello');
    });
  });

  describe('#full mounting', function () {
    beforeAll(() => {
      this.wrapper = mount(<CategoryForm />);
      this.wrapper.setProps({onComplete: jest.fn()});
    });
    afterAll(() => this.wrapper.unmount()); //if we don't unmount might create side effects for DOM of test suite that could affect other tests

    it('should reset the state.title value to empty string on form submit', () => {
      this.wrapper.setState({title: 'hoobidy'});
      expect(this.wrapper.state().title).toEqual('hoobidy');
      this.wrapper.simulate('submit', {preventDefault: () => {}}); //jest.fn() creates mock function, when we can dig down && get access to handleChange, specifically preventDefault
      expect(this.wrapper.state().title).toEqual('');
    });

    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});