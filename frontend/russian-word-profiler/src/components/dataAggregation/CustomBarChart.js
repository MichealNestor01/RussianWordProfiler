import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

const data = [
  { name: "A", value: 400, color: "#8884d8" },
  { name: "B", value: 300, color: "#82ca9d" },
  { name: "C", value: 200, color: "#ffc658" },
  { name: "D", value: 278, color: "#ff7300" },
  { name: "E", value: 189, color: "#a4de6c" },
];

const CustomBarChart = () => {
  const bandData = useSelector((state) => state.stats.bands);

  return (
    <BarChart width={900} height={300} data={bandData}>
      <CartesianGrid strokeDasharray="5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total">
        {bandData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomBarChart;
