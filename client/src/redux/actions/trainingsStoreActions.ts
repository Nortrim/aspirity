import {Training} from "../../types";

export const ENTITY = "[Trainings]";

export const types = {
    CREATE_ITEM: `${ENTITY} CREATE_ITEM`,
    EDIT_ITEM: `${ENTITY} EDIT_ITEM`,
    SET_DATA: `${ENTITY} SET_DATA`,
    DELETE_ITEM: `${ENTITY} DELETE_ITEM`,
    SET_ITEM: `${ENTITY} SET_ITEM`,
    SET_EDIT: `${ENTITY} SET_EDIT`,
    FILTER_BY_TYPE: `${ENTITY} FILTER_BY_TYPE`,
    SORT_BY: `${ENTITY} SORT_BY`
};

export const filterByType = (payload: string | null) => ({
    type: types.FILTER_BY_TYPE,
    payload
});

export const sortBy = (payload: string) => ({
    type: types.SORT_BY,
    payload
});

export const setItem = (newItem: Training) => ({
    type: types.SET_ITEM,
    payload: newItem
});

export const deleteItem = (payload: Training) => {
    console.log(payload);
    return({
        type: types.DELETE_ITEM,
        payload: payload._id
    })
};

export const setData = (payload: Training) => ({
    type: types.SET_DATA,
    payload
});

export const editItem = (payload: Training) => ({
    type: types.EDIT_ITEM,
    payload
});

export const setEdit = ({_id, state}:{_id?: string, state: boolean}) => ({
    type: types.SET_EDIT,
    payload: {
        _id,
        state
    }
});