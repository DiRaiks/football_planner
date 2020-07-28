import { fetch } from '@/utils';

export const getWeatherRequest = () => fetch
    .get('/weather/get')
    .then((response) => response.data);
