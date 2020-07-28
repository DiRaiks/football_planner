import { GetterTree } from 'vuex';

import { WeatherState, RootState, Weather, Daily } from '../types';

export const getters: GetterTree<WeatherState, RootState> = {
    getWeather: (state): Weather | null => state.weather,
    getWeatherByDays: (state): Array<Partial<Daily>> | null => state.days,
};
