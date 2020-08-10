import {apiRequest} from "../actions/utility/apiActions"
import {deleteItem, editItem, setData, setItem} from "../actions/trainingsStoreActions";
import {types} from "../actions/trainingsApiActions";
import {Action} from "../../types";


export const URL = "/trainings";

const trainingsMiddleware = () => (next: Function) => (action: Action) => {
    next(action);

    switch (action.type) {

        case types.FETCH:
            next(
                apiRequest({
                    method: "GET",
                    url: URL,
                    entity: types.FETCH,
                    success: setData
                })
            );
            break;
        case types.CREATE_ITEM:
            next(
                apiRequest({
                    method: "POST",
                    url: URL + '/create',
                    body: action.payload,
                    entity: types.CREATE_ITEM,
                    success: setItem
                })
            );
            break;

        case types.DELETE_ITEM:
            console.log(action.payload);
            next(
                apiRequest({
                    method: "POST",
                    url: URL + '/delete/' + action.payload,
                    entity: types.DELETE_ITEM,
                    success: deleteItem
                })
            );
            break;
        case types.EDIT_ITEM:
            next(
                apiRequest({
                    method: "POST",
                    url: URL + '/update/' + action.payload._id,
                    body: action.payload,
                    entity: types.EDIT_ITEM,
                    success: editItem
                })
            );
            break;

        default:
            return

    }
};

export default trainingsMiddleware