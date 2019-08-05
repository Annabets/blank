import React from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import {history} from './_helpers';
import {HomePage} from "./_components/HomePage";
import {RegisterPage} from "./_components/RegisterPage";
import {LoginPage} from "./_components/LoginPage";
import {UserPage} from "./_components/UserPage";
import {NavigationBar} from "./_components/NavigationBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unlisten = history.listen((location, action) => {
            console.log('on route change')
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    withJumbotron(Component){
        return function () {
            return(
                <Jumbotron>
                    <Container>
                        <Col md={{span:8,offset:2}} lg={{span:6,offset:3}}>
                            <Component />
                        </Col>
                    </Container>
                </Jumbotron>
            )
        }
    }

    render() {
        return (
            <>
                <NavigationBar />
                <Router history={history}>
                    <>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/register" component={this.withJumbotron(RegisterPage)} />
                        <Route exact path="/login" component={this.withJumbotron(LoginPage)} />
                        <Route path="/user/:id" component={UserPage}/>
                    </>
                </Router>
            </>
        )
    }

}
