import React, {Component} from "react";

import "./redux/index.css";
import App from "./redux/App";
import registerServiceWorker from "./redux/registerServiceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from "./redux/redux";
import { watcherSaga } from "./redux/sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); er
console.log("begin")
// create a redux store with our reducer above and middleware
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

// run the saga
sagaMiddleware.run(watcherSaga);

 class Proflie extends Component {


    componentDidMount() {
        console.log("componentDidMount" + this.fetchDog);

    }

    render() {

       // const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)

       // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        return (
        <Provider store={store}>
            <App />
        </Provider>
        );
    }
}
registerServiceWorker();
export default Proflie;
