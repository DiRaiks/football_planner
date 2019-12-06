import { fetch } from '@/utils';

import { UserObj } from '../types';

export const registrationRequest = (email: string, password: string, name: string) => fetch
    .post('/auth/registration', { email, password, name })
    .then((response) => response.data);
export const loginRequest = (email: string, password: string) => fetch
    .post('/auth/login', { email, password })
    .then((response) => response.data);
export const getCurrentUserRequest = () => fetch.get('/auth/check')
    .then((response) => response.data);
export const changeUser = (user: UserObj) => fetch.post('/users/change', user)
    .then((response) => response.data);
