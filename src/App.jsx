import {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import DeskMenu from './components/DeskMenu'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import Home from './pages/Home'
import Characters from './pages/Characters'
import Character from './pages/Character'
import Comics from './pages/Comics'
import Comic from './pages/Comic'
import Stories from './pages/Stories'
import Storie from './pages/Storie'
import NotFound from './pages/NotFound'

export default function App(){

  useEffect(()=>{
    AOS.init();
  },[])

  return(
    <Router>
      <DeskMenu/>
      <MobileMenu/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/characters/:page" component={Characters} />
        <Route exact path="/character/:id" component={Character} />
        <Route exact path="/comics/:page" component={Comics} />
        <Route exact path="/comic/:id" component={Comic} />
        <Route exact path="/stories/:page" component={Stories}/>
        <Route exact path="/storie/:id" component={Storie} />
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </Router>
  )
}