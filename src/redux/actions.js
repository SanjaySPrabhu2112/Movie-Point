import { ActionTypes } from "./ActionTypes";
import { getSearchResults } from "../api/api";

export const getSearchedMoviesFromStore = (searchWord) => async dispatch => { 
    try{
        const res = getSearchResults(searchWord);
        dispatch( {
            type: ActionTypes.actions.GET_SEARCH_RESULTS,
            payload: res
        })
    }
    catch(error){
        dispatch( {
            type: ActionTypes.actions.ERROR,
            payload: [],
        })
    }
}