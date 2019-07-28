import React from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import {history} from './_helpers';
import {connect} from "react-redux";
import {HomePage} from "./_components/HomePage";
import {RegisterPage} from "./_components/RegisterPage";
import {LoginPage} from "./_components/LoginPage";
import NavigationBar from "./_components/NavigationBar";

class App extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unlisten = history.listen((location, action) => {
            console.log("on route change");
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <>
                <NavigationBar/>
                <Router history={history}>
                    <>
                        <Route exact path="/" component={HomePage} />
                        <div className="jumbotron">
                            <div className="container">
                                <div className="col-sm-12 col-sm-offset-2">
                                    <div className="col-md-12 col-md-offset-3">
                                        <Route exact path="/register" component={RegisterPage} />
                                        <Route exact path="/login" component={LoginPage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </Router>
            </>
        )
    }

}

function mapState(state) {
    return {};
}

const actionCreators={

};

const connectedApp = connect(mapState,actionCreators)(App);
export {connectedApp as App};
