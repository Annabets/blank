import React from 'react';
import {userActions} from "../_actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                company: '',
                country: '',
                city: '',
            },
            submitted: false
        };

        this.props.getUserById(props.match.params.id)
            .then(()=>{
                this.setState({
                    user: {
                        _id: this.props.receivedUser._id,
                        firstName: this.props.receivedUser.firstName,
                        lastName: this.props.receivedUser.lastName,
                        username: this.props.receivedUser.username,
                        email: this.props.receivedUser.email || '',
                        company: this.props.receivedUser.company || '',
                        country: this.props.receivedUser.country || '',
                        city: this.props.receivedUser.city || '',
                    }
                })
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        if (user.firstName && user.lastName && user.username && user.email) {
            this.props.updateUser(user);
        }
    }

    handleDelete(id){
        return e => {
            this.props.deleteUser(id);
            this.props.logout();
        }
    }

    render() {
        const {user} = this.state;
        return(
            <>
                {user &&
                <Container>
                    <Col md={10}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={12}>
                                        <h4>User Profile</h4>
                                        <hr/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={this.handleSubmit}>
                                            {this.getFormGroupField("Username","text",
                                                "Enter username","username",
                                                user.username, true)}

                                            {this.getFormGroupField("First Name","text",
                                                "Enter First Name","firstName",
                                                user.firstName, true)}

                                            {this.getFormGroupField("Last Name","text",
                                                "Enter Last Name","lastName",
                                                user.lastName, true)}

                                            {this.getFormGroupField("Email","email",
                                                "Enter email","email",
                                                user.email, false)}

                                            {this.getFormGroupField("Company","text",
                                                "Enter your company","company",
                                                user.company,false)}

                                            {this.getFormGroupField("Country","text",
                                                "Enter your country","country",
                                                user.country,false)}

                                            {this.getFormGroupField("City / Town","text",
                                                "Enter your city","city",
                                                user.city, false)}

                                            {this.props.user && (this.props.user._id === this.state.user._id) &&
                                            <>
                                                <Button variant="primary" type="submit">Update profile</Button>
                                                <hr/>
                                                <Button variant="primary"
                                                        onClick={this.handleDelete(this.props.match.params.id)}>
                                                    Delete user
                                                </Button>
                                            </>}

                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>}
            </>
        )
    }

    getFormGroupField(fieldName,type,placeholder,name,value,isRequired){
        return(
            <Form.Group controlId={'formBasic' + fieldName}>
                <Row>
                    <Col md={4}><Form.Label>{fieldName}</Form.Label></Col>
                    <Col md={8}>
                        <Form.Control type={type} placeholder={placeholder}
                                      name={name} value={value}
                                      required ={isRequired?'required':''}
                                      onChange={this.handleChange}/>
                    </Col>
                </Row>
            </Form.Group>
        )
    }

}

function mapState(state) {
    const { users, authentication } = state;
    const {receivedUser} = users;
    const {user} = authentication;
    return { users, user, receivedUser };
}

const actionCreators = {
    getUserById: userActions.getUserById,
    updateUser: userActions.update,
    deleteUser: userActions.delete,
    logout: userActions.logout
}

const connectedUserPage = connect(mapState, actionCreators)(UserPage);
export { connectedUserPage as UserPage };

