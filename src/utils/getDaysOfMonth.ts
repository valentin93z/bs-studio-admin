import { getDayOfWeek } from "./getDayOfWeek";

export const getDaysOfMonth = (y: any, m: any) => {

    const days = [];
    const count = 33 - new Date(y, m, 33).getDate();

    for (let i = 1; i <= count; i++) {
      const day = {
        dayOfMonth: i,
        dayOfWeek: getDayOfWeek(new Date(y, m, i).getDay()),
        events: [],
      }
      days.push(day);
    }
    return days;
  }