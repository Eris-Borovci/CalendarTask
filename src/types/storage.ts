export type StoredUser = {
    id: string;
    email: string;
    password: string;
};

export type StoredToken = {
    token: string;
};

export type StoredEvent = {
    id: string;
    belongsToId: string;
    title: string;
    description: string;
    dateFrom: string;
    dateTo: string;
};