import { IDay } from "./IDay";

export interface ICalendar {
    date: number | null;
    days: IDay[];
}