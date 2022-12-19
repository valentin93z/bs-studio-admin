import { IEvent } from "./IEvent";

export interface IDay {
    dayOfMonth: number;
    dayOfWeek: number;
    events: IEvent[];
}