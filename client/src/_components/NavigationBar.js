import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class NavigationBar extends React.Component{
    constructor(props){
        super(props);

    }

    render() {
        const {user} = this.props;
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Lighthouse</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {user &&
                        <Nav.Link href={"/user/"+user._id}>Profile</Nav.Link>}

                    </Nav>
                    <Nav>
                        {!user &&
                        <Nav.Link href="/login">Login</Nav.Link>}
                        {user &&
                        <Button variant="link" onClick={e => {this.props.logout()}}>Logout</Button>}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedNavigationBar = connect(mapState, actionCreators)(NavigationBar);
export { connectedNavigationBar as NavigationBar };