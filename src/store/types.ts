export interface RootState {
    modules: object[];
}

// TABLE

export interface TableState {
    peopleData: PeopleItem[];
    event: object;
}

export interface EventItem {
    _id: string;
    place: string;
    time: string;
    date: string;
    minimum: number;
}

export interface PeopleItem {
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
