import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'

const data = [
  {category: "Problem statement", points: 3},
  {category: "State of the work", points: 6},
  {category: "Required technology stack", points: 2},
  {category: "Pricing model", points: 8},
  {category: "SLAs", points: 7},
  {category: "Selection criteria", points: 5},
  {category: "Timelines", points: 4},
  {category: "Contact details", points: 9},
  {category: "Penalty clauses", points: 1},
  {category: "Required offer type (binding or non-binding)", points: 10}
];

function Graph() {
  return (
  <div className="w-full h-1/2 screen">
    <h2>RFP Match</h2>
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis
        tickValues={data.map((_, i) => i)}
        tickFormat={data.map((d) => d.category)}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x} pts`)}
      />
      <VictoryBar data={data} x="category" y="points" />
    </VictoryChart>
  </div>

  )
}

export default Graph
