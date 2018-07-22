import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import homeLogo from '../media/lam-logo.png'
import { connect } from 'react-redux'
import { toggle } from "../actions/menuToggle"

class Nav extends Component {
    menuClick() {
        const {dispatch} = this.props;
        dispatch(toggle());
    }

    render() {
        const className = this.props.menu ? 'opened' : 'closed';
            return (
                <header>
                    <a className="ln-logo">
                        <img  src={homeLogo} alt="Lead Nicest Logo"/>
                    </a>
                    {/*<h2>Lam Nguyen</h2>*/}
                    <div id="burger" className={className} onClick={this.menuClick.bind(this)}>
                        <span id="line1" className={className}></span>
                        <span id="line2" className={className}></span>
                        <span id="line3" className={className}></span>
                    </div>
                    <nav className={className}>
                        <ul className="header">
                            <li><NavLink to="/" exact activeClassName="active" className="nav-item" onClick={this.menuClick.bind(this)}>Home</NavLink></li>
                            <li><NavLink to="/about" activeClassName="active" className="nav-item" onClick={this.menuClick.bind(this)}>About</NavLink></li>
                            <li><NavLink to="/contact" activeClassName="active" className="nav-item" onClick={this.menuClick.bind(this)}>Contact</NavLink></li>
                        </ul>
                    </nav>
                </header>
            )
    }
}
export default connect(function (store) {
    return {
        menu: store.toggle
    }
})(Nav);