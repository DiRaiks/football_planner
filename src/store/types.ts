export interface RootState {
    modules: object[];
}

// PLAYERS

export interface PlayersState {
    playersData: PlayerItem[];
    isAddPlayerPending: boolean;
    isEditPlayerPending: boolean;
    isDeletePlayerPending: boolean;
}

export interface PlayerItem {
    _id: string;
    friends: FriendItem[];
    name: string;
    date: string;
    status: boolean;
    eventId: string;
    userId: string;
}

export interface FriendItem {
    name: string;
    status: boolean;
}

// EVENTS

export interface EventsState {
    currentEventId: string | null;
    events: EventItem[] | null;
    isAddEventPending: boolean;
    isEditEventPending: boolean;
    isDeleteEventPending: string[];
    isSelectEventPending: string[];
}

export interface EventItem {
    _id?: string;
    place: string;
    time: string;
    date: string;
    minimum: number;
    playersAmount: number;
    eventName: string;
    creatorId?: string;
}

// AUTH

export interface AuthState {
    isAuth: boolean;
    user: UserObj | null;
}

export interface AuthObj {
    email: string;
    password: string;
    name: string;
}

export interface UserObj {
    _id: string;
    token: string;
    email: string;
    name?: string;
}

// LOADER

export interface LoaderState {
    isLoading: boolean;
    isNeedGlobalLoader: boolean;
}

// ERRORS

export interface ErrorsState {
    name: string;
    lastErrorUrl: string;
    lastFormData: null | object;
}

export interface ResponseError {
    message: string;
    code: string;
}

// WEATHER

export interface WeatherState {
    days: Array<Partial<Daily>> | null;
    weather: Weather | null;
}

export interface Weather {
    readonly lat: string;
    readonly lon: string;
    readonly timezone: string;
    readonly timezone_offset: number;
    readonly current: Current;
    readonly daily: Daily[];
}

interface Current {
    dt: number;
    temp: number;
    weather: Info;
}

interface Info {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Daily {
    dt: number;
    temp: DailyTemp;
    weather: Info[];
    weatherObj: Info;
}

interface DailyTemp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}
