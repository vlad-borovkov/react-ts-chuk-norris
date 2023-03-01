import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import FavList from './components/FavList/FavList';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/myfav'>
          <FavList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
