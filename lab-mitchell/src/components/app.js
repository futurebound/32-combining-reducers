import React from 'react';
import {Provider} from 'react-redux';
import createStore from '../lib/store';
import Dashboard from './dashboard/dashboard';
import {BrowserRouter, Route} from 'react-router-dom';

const store = createStore(); //creates an actual redux store

//PROVIDER is react component, which gives us access to redux in react, ENTRY POINT TO IMPLEMENTATION, how we say 'hey redux i want you to provide store to this codebase or application'
class App extends React.Component {
  //COMPONENTDIDMOUNT triggers on page load
  //store.subscribe() triggers on any changes to store state
  componentDidMount() { //LIFECYCLE HOOK, will trigger AFTER component has mounted (been added to document)
    //subscription to store, console.log() to show state when mounts
    store.subscribe(() => console.log('__STATE__:', store.getState()));
  }

  render() {
    return(
      <main className='main-content'>
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path='/' component={Dashboard}/>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
};

export default App;