interface ITime {
    value: number;
    title: string;
}

interface ITimesData {
    hours: ITime[],
    minutes: ITime[],
}

export const timesData: ITimesData = {
    hours: [
        { value: 8, title: '08' },
        { value: 9, title: '09' },
        { value: 10, title: '10' },
        { value: 11, title: '11' },
        { value: 12, title: '12' },
        { value: 13, title: '13' },
        { value: 14, title: '14' },
        { value: 15, title: '15' },
        { value: 16, title: '16' },
        { value: 17, title: '17' },
        { value: 18, title: '18' },
        { value: 19, title: '19' },
        { value: 20, title: '20' },
        { value: 21, title: '21' },
    ],
    minutes: [
        { value: 0, title: '00' },
        { value: 10, title: '10' },
        { value: 20, title: '20' },
        { value: 30, title: '30' },
        { value: 40, title: '40' },
        { value: 50, title: '50' },
    ],
};