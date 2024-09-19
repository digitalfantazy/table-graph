import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IRow } from '../types';

interface Props {
    row: IRow;
    index: number;
    onClick: (row: IRow, index: number) => void;
    isSelected: boolean;
    options: object;
}

const TableRow = ({ row, index, onClick, isSelected, options }: Props) => {
    const calcDifference = (current: number, yesterday: number) => {
        if (yesterday === 0) return { percent: 0, isPositive: true };
        const diff = ((current - yesterday) / yesterday) * 100;
        return { percent: Math.floor(diff), isPositive: diff >= 0 };
    };

    const { percent, isPositive } = calcDifference(row.currentDay, row.yesterday);
    return (
        <>
            <tr onClick={() => onClick(row, index)}>
                <td>{row.statistic}</td>
                <td>{row.currentDay.toLocaleString()}</td>
                <td className={percent === 0 ? '' : isPositive ? 'tdPositive' : 'tdNegative'}>
                    {row.yesterday.toLocaleString()}
                    <span
                        style={{
                            fontWeight: 'bold',
                            color: percent === 0 ? 'green' : isPositive ? 'green' : 'red',
                        }}
                    >
                        {` ${percent}%`}
                    </span>
                </td>
                <td>{row.currentDayOfWeek.toLocaleString()}</td>
            </tr>
            {isSelected && (
                <tr>
                    <td colSpan={4}>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
