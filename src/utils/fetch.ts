import axios, { AxiosError, AxiosResponse } from 'axios';
import get from 'lodash/get';
import store from '@/store';

export const fetch = axios.create({
    baseURL: `${ process.env.FETCHURL }`,
    timeout: 10000,
});

fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers = {
            Authorization: `Bearer ${ token }`,
        };
    }

    return config;
});

fetch.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    const errorUrl = get(error, [ 'request', 'responseURL' ]);
    const formData = get(error, [ 'response', 'config', 'data' ]);
    const errorPayload = {
        ...get(error, [ 'response', 'data', 'error' ]),
        formData: formData ? JSON.parse(formData) : undefined,
        url: errorUrl,
    };
    const errorName = errorPayload.name ||
        (error.response && error.response.status === 500 && 'INTERNAL_SERVER_ERROR') ||
        (error.response && error.response.status === 502 && 'BAD_GATEWAY');
    const isGlobalError = !errorPayload.localError;

    if (isGlobalError && !errorName && error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        store.dispatch('auth/logout', null, { root: true });
    } else if (errorName && isGlobalError) {
        store.dispatch('errors/setError', { errorPayload, errorName }, { root: true });
    }
    return Promise.reject(error);
});
