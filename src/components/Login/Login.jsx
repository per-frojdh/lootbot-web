import React, { PropTypes } from 'react';
import {login} from '../../actions/authAction';
import {connect} from 'react-redux';
import { History } from 'react-router';

/**
 * This component uses ES5 syntax since mixins are needed to
 * redirect the user to the correct place
*/
const Login = React.createClass({

    propTypes: {
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    },

    mixins: [History],

    componentWillMount() {
        if (!!sessionStorage.accessToken) {
            this.history.replaceState(null, '/');
        }
    },

    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();

        const { location, dispatch } = this.props;

        dispatch(login(username, password)).then(() => {
            if (location.state && location.state.nextPathname) {
                this.history.replaceState(null, location.state.nextPathname);
            } else {
                this.history.replaceState(null, '/');
            }
        });
    },
    render() {
        const { auth } = this.props;
        const errorMessage = (auth.error) ? <div className="rg-form-group">Login failed</div> : '';
        const btnMessage = (auth.loading) ? 'Loggar in...' : 'Logga in';

        return (
            <div className="rg-container" id="rg-login-container">
                <h1>Kartena Boilerplate</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input ref="username" type="text" placeholder="Användarnamn"/>
                    </div>
                    <div>
                        <input ref="password" type="password" placeholder="Lösenord"/>
                    </div>
                    <div>
                        <button className="button expand" type="submit">
                            {btnMessage}
                        </button>
                    </div>
                    {errorMessage}
                </form>
            </div>
        );
    },
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
