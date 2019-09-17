export interface RootState {
    modules: object[];
}

// TABLE

export interface TableState {
    peopleData: PeopleItem[];
    minimum: number;
}

export interface PeopleItem {
    friends: string[];
    name: string;
}

// AUTH

export interface AuthState {
    isAuth: boolean;
}

export interface AuthObj {
    login: string;
    password: string;
}
