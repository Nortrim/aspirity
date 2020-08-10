export const api = {
    API_REQUEST: 'API_REQUEST',
    API_SUCCESS: 'API_SUCCESS',
    API_ERROR: 'API_ERROR',
    API_VALIDATION_ERROR: 'API_VALIDATION_ERROR'
};

export const apiRequest = ({body, method, url, entity, noContentType, success, failure, params}: {
    body?: object, method: string, url: string, entity?: string, noContentType?: string, success?: Function, failure?: Function, params?: JSON
}) => ({
    type: `${entity} ${api.API_REQUEST}`,
    payload: body,
    meta: {method, url, entity, noContentType, success, failure},
    params
});