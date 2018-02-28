import React from 'react'; //alows jest/enzyme to use react library when it mounts component for us to test with
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import Enzyme, {shallow, mount} from 'enzyme';
import Dashboard from '../components/dashboard/dashboard';
import {Provider} from 'react-redux';
import createStore from '../lib/store';
require('jest');

configure({adapter: new Adapter()});

describe('<Dashboard />', function() {
  describe('#full mounting', function() {
    beforeAll(() => {
      let wrapper = mount(<Provider store={createStore()}><Dashboard /></Provider>);
      wrapper.setProps({categories: [
        {id: '1234', title: 'yooo', timestamp: new Date()},
        {id: '5678', title: 'gruu', timestamp: new Date()}]});
      this.wrapper = wrapper;
    });
    afterAll(() => this.wrapper.unmount()); //if we don't unmount might create side effects for DOM of test suite that could affect other tests

    it('should render two category items into the dom', () => {
      expect(this.wrapper.find('.dashboard').length).toEqual(1);
    });
  });
});