import {types} from "../actions/trainingsStoreActions";
import {Action, State, Training} from "../../types";

const initialState = {
    filters: {
        filterByType: null,
        sortBy: 'date'
    },
    data: []
};

export function trainingsReducer(state = initialState, action: Action) {
    let newData: Training[];

    switch (action.type) {
        case types.FILTER_BY_TYPE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    filterByType: action.payload
                }
            };
        case types.SORT_BY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortBy: action.payload
                }
            };
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
                if (el._id === action.payload._id) {
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
                if (el._id === action.payload._id) {
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
        default:
            return state
    }
}

export const getTrainings = (state: State): Training[] => {
    let data: Training[] = Object.assign([], state.trainingsReducer.data);
    const sortBy = state.trainingsReducer.filters.sortBy,
        filterByType = state.trainingsReducer.filters.filterByType;

    data = filterByType ? data.filter(item => item.type === filterByType) : data;

    return data.sort((a, b) => {
        if (sortBy === 'date') {
            return +a.date > +b.date ? 1 : +a.date < +b.date ? -1 : 0
        } else if (sortBy === 'distance') {
            return +a.distance > +b.distance ? 1 : +a.distance < +b.distance ? -1 : 0
        }
        return 0
    })
};
export const getFilters = (state: State) =>  state.trainingsReducer.filters;

