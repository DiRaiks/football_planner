import { fetch } from '@/utils';

import { UserObj } from '../types';

export const registrationRequest = (email: string, password: string, name: string) => fetch
    .post('/users', { user: { email, password, name } })
    .then((response) => response.data);
export const loginRequest = (email: string, password: string) => fetch
    .post('/users/login', { user: { email, password } })
    .then((response) => response.data);
export const getCurrentUserRequest = () => fetch.get('/users/current')
    .then((response) => response.data);
export const changeUser = (userId: string, user: UserObj) => fetch.post('/users/changeUser', { userId, user })
    .then((response) => response.data);
