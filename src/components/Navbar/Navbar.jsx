import React, { Component, PropTypes } from 'react';
import { Logout } from './';

export default class Navbar extends Component {

    render() {
        return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-inner">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.auth.user} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <Logout {...this.props} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};
