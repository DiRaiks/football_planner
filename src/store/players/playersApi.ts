import { fetch } from '@/utils';

import { PlayerItem } from '@/store/types';

export const getPlayersData = () => fetch.get('/players/getPlayersData')
    .then((response) => response.data);
export const getPlayersByDate = (date: string) => fetch.post('/players/getPlayersByDate', { date })
    .then((response) => response.data);
export const savePlayer = (player: PlayerItem) => fetch.post('/players/savePlayer', { player })
    .then((response) => response.data);
export const deletePlayer = (id: string, date: string) => fetch.post('/players/deletePlayer', { id, date })
    .then((response) => response.data);
