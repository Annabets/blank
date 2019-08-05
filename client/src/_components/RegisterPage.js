import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <>
                <h2>Register</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={user.firstName}
                                      onChange={this.handleChange}/>
                        {submitted && !user.firstName &&
                        <Form.Text className="text-danger">
                            First Name is required
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={user.lastName}
                                      onChange={this.handleChange}/>
                        {submitted && !user.lastName &&
                        <Form.Text className="text-danger">
                            Last Name is required
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={user.username}
                                      onChange={this.handleChange}/>
                        {submitted && !user.username &&
                        <Form.Text className="text-danger">
                            Username is required
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password}
                                      onChange={this.handleChange}/>
                        {submitted && !user.password &&
                        <Form.Text className="text-danger">
                            Password is required
                        </Form.Text>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {registering &&
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                        />}
                        Register
                    </Button>
                    <Button variant="link">
                        <Link to="/">Cancel</Link>
                    </Button>
                </Form>
            </>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };