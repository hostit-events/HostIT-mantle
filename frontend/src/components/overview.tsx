"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Web3 Lagos Conference 2024", value: 600 },
  { name: "Borderless 2.0", value: 400 },
  { name: "Anambra Web3 Conference", value: 600 },
  { name: "Blockchain In Unilag ", value: 700 },
  { name: "Ife Tech Community", value: 200 },
]

const COLORS = ["#FFFFFF", "#00C49F", "#FFBB28", "#FF8042", "#AAAAAA"]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          className="border-none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

