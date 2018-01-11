import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
console.log(BrowserRouter);



const App = () =><h1>Hellow World</h1>
  <Router>
    <Route path="/" component={Home} />
  </Router>
export default App;
