import {Training} from "../../types";

export const ENTITY = "[Trainings API]";

export const types = {
    FETCH: `${ENTITY} FETCH`,
    CREATE_ITEM: `${ENTITY} CREATE_ITEM`,
    EDIT_ITEM: `${ENTITY} EDIT_ITEM`,
    DELETE_ITEM: `${ENTITY} DELETE_ITEM`,
};

export const actionCreate = (newItem: Training) => ({
    type: types.CREATE_ITEM,
    payload: newItem
});

export const actionEdit = (editedItem: Training) => ({
    type: types.EDIT_ITEM,
    payload: editedItem
});

export const actionDelete = (_id: string) => ({
    type: types.DELETE_ITEM,
    payload: _id
});

export const fetchData = () => ({
    type: types.FETCH
});