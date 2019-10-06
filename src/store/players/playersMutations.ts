import { MutationTree } from 'vuex';

import { PlayersState, PlayerItem } from '../types';

export const mutations: MutationTree<PlayersState> = {
    setPlayersData(state, newData: PlayerItem[]) { state.playersData = newData; },
};
