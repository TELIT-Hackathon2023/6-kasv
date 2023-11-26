import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
    { category: "Problem statement", points: 3 },
    { category: "Scope of the work", points: 6 },
    { category: "Required technology stack", points: 2 },
    { category: "Pricing model", points: 8 },
    { category: "Service level agreements (SLAs)", points: 7 },
    { category: "Selection criteria", points: 5 },
    { category: "Timelines", points: 4 },
    { category: "Contact details", points: 9 },
    { category: "Penalty clauses", points: 1 },
    { category: "Required offer type (binding or non-binding)", points: 10 }
];

const calculateAverage = (data) => {
    const sum = data.reduce((acc, cur) => acc + cur.points, 0);
    return sum / data.length;
};

const Graph = () => {
    const average = calculateAverage(data);

    return (
        <div className="flex flex-col items-center max-w-3xl mx-auto border-2 p-4 bg-white rounded-md shadow-md">
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
