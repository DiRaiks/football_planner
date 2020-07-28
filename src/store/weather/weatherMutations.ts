import { MutationTree } from 'vuex';

import { WeatherState, Weather, Daily } from '../types';

export const mutations: MutationTree<WeatherState> = {
    setWeather(state, weather: Weather) { state.weather = weather; },
    setDays(state, days: Array<Partial<Daily>> | null) { state.days = days; },
};
