export interface RootState {
    modules: object[];
}

// TABLE

export interface TableState {
    peopleData: PeopleItem[];
    minimum: number;
    place: string;
    time: string;
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
