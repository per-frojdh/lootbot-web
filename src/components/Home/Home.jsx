import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authAction';
import { pushPath } from 'redux-simple-router';
import { Navbar } from '../';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div className="rg-full-height">
                <Navbar {...this.props} />
                <div className="home-container">
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout, pushPath }, dispatch);
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
