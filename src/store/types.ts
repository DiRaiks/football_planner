export interface RootState {
    modules: object[];
}

// PLAYERS

export interface PlayersState {
    playersData: PlayerItem[];
}

export interface PlayerItem {
    _id: string;
    friends: string[];
    name: string;
    date: string;
    status: boolean;
    eventId: string;
}

// EVENTS

export interface EventsState {
    currentEvent: EventItem | null;
    events: EventItem[] | null;
}

export interface EventItem {
    _id?: string;
    place: string;
    time: string;
    date: string;
    minimum: number;
    playersAmount: number;
    eventName: string;
}

// AUTH

export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
}

export interface AuthObj {
    login: string;
    password: string;
}
