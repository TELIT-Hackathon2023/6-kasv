import React from 'react'

function Score() {
  const data = [
    {category: "Problem statement", points: 3},
    {category: "Scope of the work", points: 6},
    {category: "Required technology stack", points: 2},
    {category: "Pricing model", points: 8},
    {category: "Service level agreements (SLAs)", points: 7},
    {category: "Selection criteria", points: 5},
    {category: "Timelines", points: 4},
    {category: "Contact details", points: 9},
    {category: "Penalty clauses", points: 1},
    {category: "Required offer type (binding or non-binding)", points: 10}
  ];

  const sum = data.reduce((acc, cur) => acc + cur.points, 0);
  const average = sum / data.length;

  return (
    <div>
      <h2 className="text-tmagenta">Average point: {average}</h2>                  
    </div>
  )
}

export default Score
