const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const A_CALL_REQUEST = "A_CALL_REQUEST";
const B_CALL_SUCCESS = "B_CALL_SUCCESS";
const C_CALL_FAILURE = "C_CALL_FAILURE";

//reducer with initial state
const initialState = {
    fetching: false,
    dog : null,
    error: null,
    a:false,
    b:null,
    c:null
};

export function reducer(state = initialState, action){
    switch (action.type) {
        case API_CALL_REQUEST:
            console.log("redux.js - reducer - REQUEST");
            return {...state, fetching: true, error: null};
        case API_CALL_SUCCESS:
            console.log("redux.js - reducer - SUCCESS");
            return {...state, fetching: false, dog: action.dog};
        case API_CALL_FAILURE:
            console.log("redux.js - reducer - FALLURE");
            return {...state, fetching: false, dog: [], error: action.error};
        case A_CALL_REQUEST:
            console.log("redux.js - reducer -New A REQUEST");
            return {...state, a: true, c:null};
        case B_CALL_SUCCESS:
            console.log("redux.js - reducer -New A REQUEST");
            return {...state,a:false,b: action.b,c:null}
        default:
            console.log("redux.js - reducer - STATE");
            return state;
    }
}