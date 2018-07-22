import React, { Component } from 'react'
import Nav from '../Nav'
import Spinner from 'react-spinkit'

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = this.state = {            
            loading: true
         }
    }

    componentWillMount() {   
        setTimeout(() => {
            this.setState({loading: false})
        }, 2000)
    }

    render(){
        if (this.state.loading) {
            return (
                <div className= 'loadContainer'>
                    <div className= 'Spinner'>
                        <Spinner  name="pacman" color="yellow"/>
                    </div>
                    
                </div>
            )            
        }
        return (
            <div>
                <Nav/>
                <h1>hello</h1>
            </div>
        )
    }
}

export default Contact;
