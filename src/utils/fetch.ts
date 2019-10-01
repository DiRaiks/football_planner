import axios from 'axios';
import { FETCH_URL } from '@/store/constants';

export const fetch = axios.create({
    baseURL: `${ process.env.FETCHURL }/api`,
    timeout: 10000,
});

fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers = {
            Authorization: `Token ${ token }`,
        };
    }

    return config;
});
