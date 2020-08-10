import { combineReducers } from 'redux';
import { trainingsReducer } from "./trainingsReducer";

export const rootReducer = combineReducers({
    trainingsReducer: trainingsReducer
});
