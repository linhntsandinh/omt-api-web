import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    console.log("sagas.js - watcherSaga");
    yield takeLatest("API_CALL_REQUEST", workerSaga);
}
// function that makes the api request and returns a Promise for response
function fetchDog() {
    console.log("sagas-FetchDog");
    return axios({
        method: "get",
        url: "http://localhost:9000/profile/info/1",
        headers: {
            'Content-Type': 'application/json'
        }

        //"https://jsonplaceholder.typicode.com/posts/1"
    });
}



// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        console.log("sagas.js - werkerSaga - 1 " + fetchDog());
        const response = yield call(fetchDog);
       // console.log('first el', JSON.stringify(response.data[0]))
        //console.log("sagas - werkerSaga - 2" + response);
       // const dog = JSON.stringify(response.data[0].postId );
        const dog =JSON.stringify(response.data);
       // console.log("sagas - werkerSaga - 3 "  + dog);
        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_SUCCESS", dog});
        console.log("sagas - werkerSaga - 4");
    } catch (error) {
        console.log("sagas - werkerSaga - 5");
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
    }
}