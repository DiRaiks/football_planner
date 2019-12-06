import { fetch } from '@/utils';

import { PlayerItem } from '@/store/types';

export const getPlayersData = () => fetch.get('/players/all')
    .then((response) => response.data);
export const getPlayersByDate = (date: string) => fetch.post('/players/getPlayersByDate', { date })
    .then((response) => response.data);
export const savePlayer = (player: PlayerItem) => fetch.post('/players/save', player)
    .then((response) => response.data);
export const changePlayer = (playerId: string, player: PlayerItem) => fetch
    .put('/players/change', player, { params: { playerID: playerId } })
    .then((response) => response.data);
export const deletePlayer = (id: string) => fetch.delete('/players/delete', { params: { playerID: id } })
    .then((response) => response.data);
export const getPlayersByEvent = (eventId: string) => fetch.get('/players/byEventId', { params: { eventID: eventId } })
    .then((response) => response.data);
