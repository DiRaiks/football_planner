import { ActionTree } from 'vuex';

import { getWeatherRequest } from './weatherApi';

import { WeatherState, RootState, Weather, Daily } from '../types';

export const actions: ActionTree<WeatherState, RootState> = {
    async getWeather({ commit }) {
        try {
            const weather: Weather = await getWeatherRequest();

            const days: Array<Partial<Daily>> = weather.daily
                .map(({ dt, temp, weather }) => ({ dt, temp, weatherObj: weather[0] }));

            commit('setWeather', weather);
            commit('setDays', days);
        } catch (error) {
            commit('setError');
        }
    },
};
