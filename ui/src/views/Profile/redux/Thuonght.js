import React, { Component } from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";


class Thuonght extends Component {

    render() {
        console.log("App.js - Render")
        const { a, b, onRequestDog, c } = this.props;

        return (
            <div className="App">
                <header className="App-header">


                    <img src={b || logo} className="App-logo" alt="logo" />
                </header>

                {b ? (
                    <p className="App-intro">Keep clicking for new dogs</p>
                ) : (
                    <p className="App-intro">Replace the React icon with a dog!</p>
                )}

                {a ? (
                    <button disabled>Fetching...</button>
                ) : (
                    <button onClick={onRequestDog}>Request a Dog</button>
                )}

                {c && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

            </div>
        );
    }
}



const mapStateToProps = state => {
    console.log("App.js - mapStateToProps");
    return {
        a: state.a,
        b: state.b,
        c: state.c
    };
};

const mapDispatchToProps = dispatch => {
    console.log("App.js - mapDispatchToProps");
    return {
        onRequestDog: () => dispatch({ type: "A_CALL_REQUEST" }),
        //onR: ()=>dispatch({type: "API_CALL_REQUEST"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thuonght);
