import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FullHeightImageHeader from './FullHeightImageHeader';

import { userActions } from '../_actions';


class HomePage extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <>
                <FullHeightImageHeader/>
                <div className="col-md-6 col-md-offset-3">
                    {user && <h1>Hi {user.firstName}!</h1>}
                    <h3>All registered users:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ?
                                        <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                    }
                </div>
            </>
        )
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getUsers,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };