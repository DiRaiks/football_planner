export interface RootState {
    modules: object[];
}

// TABLE

export interface TableState {
    peopleData: PeopleItem[];
    minimum: number;
    event: object;
}

export interface EventItem {
    _id: string;
    place: string;
    time: string;
    date: string;
}

export interface PeopleItem {
    _id: string;
    friends: string[];
    name: string;
    date: string;
}

// AUTH

export interface AuthState {
    isAuth: boolean;
}

export interface AuthObj {
    login: string;
    password: string;
}
