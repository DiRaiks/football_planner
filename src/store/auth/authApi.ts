import { fetch } from '@/utils';

export const registrationRequest = (login: string, password: string) => fetch
    .post('/users', { user: { email: login, password } })
    .then((response) => response.data);
export const loginRequest = (login: string, password: string) => fetch
    .post('/users/login', { user: { email: login, password } })
    .then((response) => response.data);
export const getCurrentUserRequest = () => fetch.get('/users/current')
    .then((response) => response.data);
