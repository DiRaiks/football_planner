import { PlayerItem, FriendItem } from '@/store/types';

export const countAllPLayers = (playersData: PlayerItem[]) => {
    let allPlayersArray: object[] = [];

    for (const value of playersData) {
        allPlayersArray.push(value);
        if (value.friends.length) {
            const friendsArray: object[] = value.friends.filter((friend: FriendItem) => {
                return friend.name;
            });
            allPlayersArray = allPlayersArray.concat(friendsArray);
        }
    }
    return allPlayersArray;
};
