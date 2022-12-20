export interface IEvent {
    date: {
        year: number;
        month: number;
        day: number;
    };
    time: {
        hours: string;
        minutes: string;
    };
}

export interface IEvents {
    events: IEvent[];
    newEvent: IEvent;
}