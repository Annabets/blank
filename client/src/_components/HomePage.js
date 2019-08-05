import React from 'react';
import { connect } from 'react-redux';
import FullHeightImageHeader from './FullHeightImageHeader';

import { userActions } from '../_actions';


class HomePage extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <>
                <FullHeightImageHeader/>
            </>
        )
    }

    componentDidMount() {
        this.props.getUsers();
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getUsers
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };