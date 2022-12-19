interface IEvent {
    date: {
        year: number;
        month: number;
        day: number;
    };
    time: {
        hours: number;
        minutes: number;
    };
}

export interface IEvents {
    events: IEvent[];
    newEvent: IEvent;
}