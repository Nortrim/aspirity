import {types} from "../actions/trainingsStoreActions";
import {Action, Training} from "../../types";

const initialState = {
    data: []
};

export function trainingsReducer(state = initialState, action: Action) {
    let newData: Training[];

    switch (action.type) {
        case types.SET_DATA:
            return {
                ...state,
                data: action.payload.map((item: Training): Training => ({...item, isEdit: false}))
            };
        case types.SET_ITEM:
            return {
                ...state,
                data: [...state.data, {...action.payload, isEdit: false}]
            };
        case types.EDIT_ITEM:
            newData = Object.assign([], state.data);
            newData.forEach((el: Training, index: number) => {
                if(el._id === action.payload._id) {
                    newData[index] = action.payload
                }
            });
            return {
                ...state,
                data: newData
            };
        case types.DELETE_ITEM:
            return {
                ...state,
                data: state.data.filter((item: Training) => item._id !== action.payload)
            };
        case types.SET_EDIT:
            newData = Object.assign([], state.data);
            newData.forEach((el: Training, index: number) => {
                el.isEdit = false;
                if(el._id === action.payload._id) {
                    newData[index] = {
                        ...newData[index],
                        isEdit: action.payload.state
                    }
                }
            });
            return {
                ...state,
                data: newData
            };
        default: return state
    }
}

