import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminChart = (props) => {
  const prop = props.data;
  const chartData = props.chartData;
  const setChartData = props.setChartData;
  console.log(props);
  console.log("prop", prop);

  useEffect(() => {
    console.log("prop2", prop);
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/chart?chartOrder=${prop}`)
      .then((res) => {
        console.log(res);
        setChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [prop]);

  if (chartData != null && prop === 2) {
    const setmonth6 = {
      labels: [
        chartData[0].mon,
        chartData[1].mon,
        chartData[2].mon,
        chartData[3].mon,
        chartData[4].mon,
        chartData[5].mon,
      ],
      datasets: [
        {
          label: "월매출",
          data: [
            chartData[0].priceOfMonth,
            chartData[1].priceOfMonth,
            chartData[2].priceOfMonth,
            chartData[3].priceOfMonth,
            chartData[4].priceOfMonth,
            chartData[5].priceOfMonth,
          ],
          backgroundColor: ["rgba(91, 143, 110, 0.2)"],
          borderColor: ["rgba(91, 143, 110, 1)"],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={setmonth6} options={options} />;
  }

  if (chartData != null && prop === 1) {
    const setmonth3 = {
      labels: [chartData[0].mon, chartData[1].mon, chartData[2].mon],
      datasets: [
        {
          label: "월매출",
          data: [
            chartData[0].priceOfMonth,
            chartData[1].priceOfMonth,
            chartData[2].priceOfMonth,
          ],
          backgroundColor: ["rgba(91, 143, 110, 0.2)"],
          borderColor: ["rgba(91, 143, 110, 1)"],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={setmonth3} options={options} />;
  }

  console.log(chartData);
  if (chartData != null && prop === 3) {
    const setmonth12 = {
      labels: [
        chartData[0].mon,
        chartData[1].mon,
        chartData[2].mon,
        chartData[3].mon,
        chartData[4].mon,
        chartData[5].mon,
        chartData[6].mon,
        chartData[7].mon,
        chartData[8].mon,
        chartData[9].mon,
        chartData[10].mon,
        chartData[11].mon,
      ],
      datasets: [
        {
          label: "월매출",
          data: [
            chartData[0].priceOfMonth,
            chartData[1].priceOfMonth,
            chartData[2].priceOfMonth,
            chartData[3].priceOfMonth,
            chartData[4].priceOfMonth,
            chartData[5].priceOfMonth,
            chartData[6].priceOfMonth,
            chartData[7].priceOfMonth,
            chartData[8].priceOfMonth,
            chartData[9].priceOfMonth,
            chartData[10].priceOfMonth,
            chartData[11].priceOfMonth,
          ],
          backgroundColor: ["rgba(91, 143, 110, 0.2)"],
          borderColor: ["rgba(91, 143, 110, 1)"],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={setmonth12} options={options} />;
  }
  /* */
};

export default AdminChart;
