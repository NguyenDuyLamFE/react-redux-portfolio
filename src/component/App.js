import {BrowserRouter as Router, Route } from 'react-router-dom';
// import React, { Component } from 'react';
import HomePage from './home/Home';
import About from './about/About';
import Contact from './contact/Contact';
import React, { Component } from 'react';

class App extends Component{
    render(){
        return (
            <Router>

                <div className="content">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                </div>

            </Router>
        )
    }

}

export default App





