import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();
console.log(history);

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/dog">Dog</Link>
    <Link to={{ pathname: "/about" }}>About</Link>
    <Link replace to="/contact">Contact</Link>
  </nav>
)

const Dog = ()=>{
  return(
    <h4>my dog is Uli</h4>
  )
}

const About=()=>{
  function godog() {
    console.log('in godog');
    console.log(history);
    history.push('/rr4/dog/');
  }
  return(<div>
    <h1>About</h1>
    <button type="button" onClick={godog}>go dog</button>
  </div>)
}

const App = (props) => {
  console.log(props);
  return(
  <Router basename={props.path}>
    <div>
      <Links />
      <Route path="/dog" render={() => Dog()} />
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route path="/about" component={() => About()} />
      <Route path="/contact" render={() => <h1>Contact</h1>} />
    </div>
  </Router>
  );
}

export default App
