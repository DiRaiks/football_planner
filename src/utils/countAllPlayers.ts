import { PlayerItem, FriendItem } from '@/store/types';
import lodash from 'lodash';

export const countAllPLayers = (playersData: PlayerItem[]) => {
    let allPlayersArray: object[] = [];

    for (const value of playersData) {
        allPlayersArray.push(value);
        if (value.friends.length) {
            const friendsArray: FriendItem[] = value.friends.filter((friend: FriendItem) => {
                return friend.name;
            });
            allPlayersArray = allPlayersArray.concat(friendsArray);
        }
    }
    const filteredAllPlayersArray: any = lodash.sortBy(allPlayersArray, (item: PlayerItem | FriendItem) => {
        return !item.status;
    });
    return filteredAllPlayersArray;
};
