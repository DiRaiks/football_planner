export interface RootState {
    modules: object[];
}

// PLAYERS

export interface PlayersState {
    playersData: PlayerItem[];
}

// EVENTS

export interface EventsState {
    event: EventItem | null;
}

// TABLE

export interface TableState {
    peopleData: PlayerItem[];
    event: object;
}

export interface EventItem {
    _id: string;
    place: string;
    time: string;
    date: string;
    minimum: number;
}

export interface PlayerItem {
    _id: string;
    friends: string[];
    name: string;
    date: string;
    status: boolean;
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
