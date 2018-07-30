import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";

class App extends Component {

    render() {
        console.log("App.js - Render")
        const { fetching, dog, onRequestDog, error } = this.props;

        return (
            <div className="App">
                <header className="App-header">

                    <p>{dog}</p>

                    <h1 className="App-title">Welcome to Dog Saga</h1>
                </header>

                {dog ? (
                    <p className="App-intro">Keep clicking for new dogs</p>
                ) : (
                    <p className="App-intro">Replace the React icon with a dog!</p>
                )}

                {fetching ? (
                    <button disabled>Fetching...</button>
                ) : (
                    <button onClick={onRequestDog}>Request a Dog</button>
                )}

                {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("App.js - mapStateToProps");
    return {
        fetching: state.fetching,
        dog: state.dog,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    console.log("App.js - mapDispatchToProps");
    return {
        onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" }),
        onR: ()=>dispatch({type: "API_CALL_REQUEST"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);