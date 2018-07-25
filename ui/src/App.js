import React, {Component} from 'react';
import {Redirect, HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import '../node_modules/react-datetime/css/react-datetime.css'
import '../node_modules/react-select/dist/react-select.css';
// Containers
import {DefaultLayout} from './containers';
// Pages
import {Login, Page404, Page500, Register} from './views/Pages';
import {formEncode, getData} from "./DataUser";
// import { renderRoutes } from 'react-router-config';
import {connect} from 'react-redux'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.isLogin();
    }

    isLogin() {
        fetch("https://daivt.000webhostapp.com/login.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode({user: localStorage.getItem("username"), pass: localStorage.getItem("password")}),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    this.props.dispatch({type: "profile", data: responseJson})

                }
                this.setState({
                    loading: true
                })
            })

    }

    render() {
        // console.log(this.state.loading)
        return (
            <HashRouter>{this.state.loading ?
                <Switch>
                    {!this.props.isLogin ?
                        <Route path="/login" name="Login Page" component={Login}/> : null}
                    {!this.props.isLogin ? <Redirect from="/" to="/login"/> : null}
                    <Route exact path="/register" name="Register Page" component={Register}/>
                    <Route exact path="/404" name="Page 404" component={Page404}/>
                    <Route exact path="/500" name="Page 500" component={Page500}/>
                    {this.props.isLogin ? <Route path="/" name="Home" component={DefaultLayout}/> : null}
                </Switch> : null}
            </HashRouter>
        );
    }
}

function mapStatetoProps(state) {
    return {isLogin: state.isLogin}

}

export default connect(mapStatetoProps)(App);
