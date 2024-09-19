import { useState } from 'react';

import { data } from './mockData';
import TableRow from './components/TableRow';
import { IChartData, IRow } from './types';

function App() {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [chartData, setChartData] = useState<IChartData[]>([]);
    const [chartTitle, setChartTitle] = useState<string>('');

    const options = {
        title: {
            text: chartTitle,
        },
        xAxis: {
            categories: chartData.map((d) => d.day),
        },
        yAxis: {
            title: {
                text: 'Сумма, руб',
            },
        },
        series: [
            {
                name: chartTitle,
                data: chartData.map((d) => d.value),
            },
        ],
    };

    const handleRowClick = (row: IRow, index: number) => {
        console.log(index);
        if (selectedRow === index) {
            setSelectedRow(null);
            setChartData([]);
            setChartTitle('');
        } else {
            const newData = row.dataPerDay.map((item) => ({
                day: item.day,
                value: item.value,
            }));
            setSelectedRow(index);
            setChartData(newData);
            setChartTitle(`${row['statistic']}`);
        }
    };

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <td>Показатель</td>
                        <td>Текущий день</td>
                        <td>Вчера</td>
                        <td>Этот день недели</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            row={row}
                            index={index}
                            onClick={handleRowClick}
                            isSelected={selectedRow === index}
                            options={options}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
