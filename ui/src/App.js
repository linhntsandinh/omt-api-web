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
// Containers
import {DefaultLayout} from './containers';
// Pages
import {Login, Page404, Page500, Register} from './views/Pages';
import {formEncode,getData} from "./DataUser";

// import { renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: localStorage.getItem('Login')
        }
    }
    HandleChange() {
        this.setState({
            isLogin: !this.state.isLogin
        })
        console.log("DM")
    }

    // componentDidMount() {
    //         fetch("https://daivt.000webhostapp.com/login.php", {
    //             method: 'POST',
    //             headers: {"Content-type": "application/x-www-form-urlencoded"},
    //             body: formEncode({user: getData('username'), pass: getData('password')}),
    //         }).then((response) => response.json())
    //             .then((responseJson) => {
    //                     localStorage.setItem('data', JSON.stringify(responseJson));
    //                     localStorage.setItem('Login', 'false')
    //                     this.HandleChange();
    //                 }
    //             )
    // }


    render() {
        return (
            <HashRouter>
                <Switch>
                    {!this.state.isLogin ?
                        <Route exact path="/login" name="Login Page"
                               render={(pop) => <Login props={pop} parent={this}/>}/> : null}
                    {!this.state.isLogin ? <Redirect from="/" to="/login"/> : null}
                    <Route exact path="/register" name="Register Page" component={Register}/>
                    <Route exact path="/404" name="Page 404" component={Page404}/>
                    <Route exact path="/500" name="Page 500" component={Page500}/>
                    {this.state.isLogin ? <Route path="/" name="Home"
                                                 render={(pop) => <DefaultLayout props={pop} parent={this}/>}/> : null}
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
