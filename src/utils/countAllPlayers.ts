import { PlayerItem } from '@/store/types';

export const countAllPLayers = (playersData: PlayerItem[]) => {
    let allPlayersArray: object[] = [];

    for (const value of playersData) {
        allPlayersArray.push(value);
        if (value.friends.length) {
            const friendsArray: object[] = value.friends.map((friend: string) => {
                return { name: friend, status: value.status };
            });
            allPlayersArray = allPlayersArray.concat(friendsArray);
        }
    }
    return allPlayersArray;
};
