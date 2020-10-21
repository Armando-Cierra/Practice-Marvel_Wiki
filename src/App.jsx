import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import DeskMenu from './components/DeskMenu';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';

import Home from './pages/Home';
import Characters from './pages/Characters';
import Character from './pages/Character';
import Comics from './pages/Comics';
import Comic from './pages/Comic';
import Stories from './pages/Stories';
import Storie from './pages/Storie';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Router>
      <DeskMenu/>
      <MobileMenu/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/characters/:pageNumber" component={Characters}/>
        <Route path="/character/:id" exact component={Character}/>
        <Route path="/comics/:pageNumber" exact component={Comics}/>
        <Route path="/comic/:id" exact component={Comic}/>
        <Route path="/stories/:pageNumber" exact component={Stories}/>
        <Route path="/storie/:id" exact component={Storie}/>
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;