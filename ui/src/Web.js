import React, {Component} from 'react';
import App from './App'
import {Provider} from  'react-redux'
import {createStore} from 'redux'
import {formEncode} from "./DataUser";
const profile={isLogin:false,profile:[]}
const reducer = (state=profile,action)=>{
    if(action.type==='login')return{isLogin:true,profile:action.data}
    if(action.type==='logout')return{isLogin:false,profile:action.data}
    return state;

}
const store = createStore(reducer)

export default  class Web extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Provider store={store}>
            <App/>
            </Provider>
        )
}
}