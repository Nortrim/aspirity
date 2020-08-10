export type Training = {
    _id?: string
    name: string
    distance: number
    date: string
    type: string
    comment?: string
    isNew?: boolean
    isEdit?: boolean
}

export type State = {
    trainingsReducer: {
        filters: {
            filterByType: string | null,
            sortBy: string
        }
        data: Training[]
    }
}

export type Action = {
    type: string
    payload?: any
    meta?: any
    params?: any
}