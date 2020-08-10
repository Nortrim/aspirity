import axios from "axios";
import {isFunction, isString} from 'lodash'
import {api} from "../actions/utility/apiActions";
import {Action} from "../../types";

const API = 'http://localhost:8080/api';


const actionFromArg = (arg: Function | string): Function => {
    if (isFunction(arg)) {
        return arg
    } else if (isString(arg)) {
        return (payload: any) => ({type: arg, payload})
    } else {
        return (payload: any) => ({...arg, payload})
    }
};

const apiMiddleware = ({dispatch}: { dispatch: Function }) => (next: Function) => (action: Action) => {
    next(action);

    if (action.type && action.type.includes(api.API_REQUEST)) {
        const {url, method, success, failure} = action.meta;

        const request = axios({
            method: method,
            url: API + url,
            data: action.payload || undefined
        });

        return request
            .then(response => {
                success && dispatch(actionFromArg(success)(response.data))
            })
            .catch(error => {
                failure && dispatch(actionFromArg(failure)(error))
            })
    }
};

export default apiMiddleware