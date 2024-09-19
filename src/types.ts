export interface IRow {
    statistic: string;
    currentDay: number;
    yesterday: number;
    currentDayOfWeek: number;
    dataPerDay: { day: string; value: number }[];
}

export interface IChartData {
    day: string;
    value: number;
}
