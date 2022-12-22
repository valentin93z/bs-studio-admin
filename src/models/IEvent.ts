export interface IEvent {
    status: 'free' | 'ordered';
    date: {
        year: number;
        month: number;
        day: number;
    };
    time: {
        hours: string;
        minutes: string;
    };
    _id?: string;
    client?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
    },
    service?: string;
    master?: string;
}

export interface IEvents {
    events: IEvent[];
    newEvent: IEvent;
}