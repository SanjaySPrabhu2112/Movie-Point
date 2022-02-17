import { ActionTypes } from "./ActionTypes"

function reducer(state = { movies: [] }, action) {
    switch (action.type) {
        case ActionTypes.actions.GET_SEARCH_RESULTS:
            return { ...state, movies: action.payload };
        case ActionTypes.actions.ERROR:
            return { ...state };
        default:
            return state;
    }
}

export default reducer;