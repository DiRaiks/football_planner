import { MutationTree } from 'vuex';

import { PlayersState, PlayerItem } from '../types';

export const mutations: MutationTree<PlayersState> = {
    setPlayersData(state, newData: PlayerItem[]) { state.playersData = newData; },
    changePlayer(state, newPlayer: PlayerItem) {
        if (!state.playersData) return;
        state.playersData = state.playersData.map((player: PlayerItem) => {
            if (player._id === newPlayer._id) {
                player = { ...newPlayer };
                return player;
            }
            return player;
        });
    },
    setIsAddPlayerPending(state, isPending: boolean) { state.isAddPlayerPending = isPending; },
    setIsEditPlayerPending(state, isPending: boolean) { state.isEditPlayerPending = isPending; },
    setIsDeletePlayerPending(state, isPending: boolean) { state.isAddPlayerPending = isPending; },
};
