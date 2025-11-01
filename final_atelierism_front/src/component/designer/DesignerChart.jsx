import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DesignerChart = (props) => {
  const chartData = props.chartData;

  const labels = chartData.map((item) => {
    const month = item.month.split("-")[1];
    return `${parseInt(month, 10)}월`;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "총 작업건",
        data: chartData.map((item) => item.totalCount),
        backgroundColor: "rgba(138, 169, 150, 0.7)",
        borderColor: "rgba(138, 169, 150, 1)",
        borderWidth: 1,
      },
      {
        label: "작업완료",
        data: chartData.map((item) => item.completedCount),
        backgroundColor: "rgba(194, 166, 140, 0.7)",
        borderColor: "rgba(194, 166, 140, 1)",
        borderWidth: 1,
      },
      {
        label: "작업중",
        data: chartData.map((item) => item.ongoingCount),
        backgroundColor: "rgba(230, 216, 195, 0.7)",
        borderColor: "rgba(230, 216, 195, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return value + "건";
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DesignerChart;
