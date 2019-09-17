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
