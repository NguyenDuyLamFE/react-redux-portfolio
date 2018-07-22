import React, { Component } from 'react'
import Nav from '../Nav'
import mp4 from '../../media/Productive-Morning.mp4'
import webm from '../../media/Productive-Morning.webm'
import nameLogo from '../../media/short-logo.png'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

class Home extends Component{
    
    constructor(props) {
        super(props);
        this.state = this.state = {            
            loading: true
         }
    }

    componentWillMount() {   
        setTimeout(() => {
            this.setState({loading: false})
        }, 3500)
    }

    render(){
        const className = this.props.menu ? 'empty'  : '';

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
                <div id="main">
                    <Nav/>
                    <div  className='home-content'>
                        <div className= 'video-content'>
                            <img  className={className} src={nameLogo} alt="Lead Nicest"/>
                            <h2 className={className} >Duy Lam</h2>
                            <h2 className={className}>Front End Developer</h2>
                            <p className={className}>
                                Don't coding like a robot. Let's do something creative everyday !<br/>
                                With you, I challenge infinite possibilities.
                            </p>
                        </div>                       
                    </div>
                    <video preload="true" autoPlay loop muted="muted" className="fillWidth">
                        <source src={mp4} type="video/mp4" />
                        <source src={webm} type="video/webm" />
                    </video>
                </div>
        )
    }

}

export default connect(function (store) {
    return {
        menu: store.toggle,
    }
})(Home);



