import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
    { category: "1", points: 3 },
    { category: "2", points: 6 },
    { category: "3", points: 2 },
    { category: "4", points: 8 },
    { category: "5", points: 7 },
    { category: "6", points: 5 },
    { category: "7", points: 4 },
    { category: "8", points: 9 },
    { category: "9", points: 1 },
    { category: "10", points: 2 }
];

const calculateAverage = (data) => {
    const sum = data.reduce((acc, cur) => acc + cur.points, 0);
    return sum / data.length;
};

const Graph = () => {
    const average = calculateAverage(data);

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <h2 className="text-2xl text-tmagenta">No data available</h2>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center justify-center mx-auto  rounded-md shadow-sm">
            <h2 className="text-2xl font-bold">RFP Match</h2>
            <div className="flex items-center justify-center">
                <h2 className="w-64 flex flex-col items-center px-4 py-6 text-tmagenta bg-white">Average points: {average}</h2>
            </div>
            <VictoryChart
                domainPadding={20}
                height={400}
                width={800}
                theme={VictoryTheme.material}
            >
                <VictoryAxis
                    tickValues={data.map((_, i) => i)}
                    tickFormat={data.map((d) => d.category.split(' '))}
                    style={{
                        tickLabels: { fontSize: 12, padding: 5, textAnchor: 'middle' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x} pts`}
                    style={{ tickLabels: { fontSize: 12, padding: 10 } }}
                />
                <VictoryBar
                    data={data}
                    x="category"
                    y="points"
                    style={{
                        data: {
                            fill: '#E10075',
                            width: 20,
                        },
                        labels: {
                            fontSize: 10,
                            fill: '#333',
                        },
                    }}
                />
            </VictoryChart>
        </div>
    );
};

export default Graph;
