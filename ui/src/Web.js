import React, {Component} from 'react';
import App from './App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const profile = {isLogin: false, permistion: 'admin', profile: [], limit: 10}
const reducer = (state = profile, action) => {
    switch (action.type) {
        case 'login':
            return {...state, isLogin: true, profile: action.data}
        case 'logout':
            return {...state, isLogin: false, profile: action.data}
        case 'set_limit':
            return {...state, limit: action.data}
        default:
            return state
    }
    // if (action.type === 'login') return {isLogin: true, profile: action.data}
    // if (action.type === 'logout') return {isLogin: false, profile: action.data}
    // if(action.type==='logout')return{isLogin:false,profile:action.data}
    // return state;

}
const store = createStore(reducer)
export default class Web extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}