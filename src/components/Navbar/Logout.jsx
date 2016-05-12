import React, {Component, PropTypes} from 'react';

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        event.preventDefault();
        const { logout, pushPath } = this.props;

        logout().then( () => {
            return pushPath('/login');
        });
    }

    render() {
        return (
             <li onClick={this.handleClick}><a href="#">Logga ut</a></li>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    pushPath: PropTypes.func.isRequired,
};
