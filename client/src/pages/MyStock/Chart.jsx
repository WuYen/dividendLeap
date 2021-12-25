import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { api } from "../../utils";

//https://www.omnisci.com/blog/12-color-palettes-for-telling-better-stories-with-your-data
const colors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];

export default function ChartContainer(props) {
  const ref = useRef();
  const [data, setData] = useState(null);
  const query = {
    stockNo: "2881",
    year: "2020",
  };

  useEffect(() => {
    const stockNo = "2881";
    api.get(`/forecast/day/${stockNo}`).then((response) => {
      console.log("chart result", response);
      response.success && setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const datasets = data.map((x, index) => {
        return {
          label: x.year,
          data: x.data.map((x) => x.price),
          borderWidth: 3,
          pointRadius: 0,
          borderColor: index == 0 ? "#319795" : "#cecece",
        };
      });
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Array(data[0].data.length).keys()],
          datasets: datasets,
        },
        options: {
          interaction: {
            mode: "index",
            intersect: false,
            position: "nearest",
          },
          scales: {
            x: {
              beginAtZero: false,
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: false,
              grid: {
                display: true,
              },
            },
          },
          elements: {
            point: { pointStyle: "line" },
            line: {
              tension: 0.1,
              borderWidth: 0,
              //   borderColor: "red",
              //   borderCapStyle: "square",
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas id="myChart" width="50" height="16"></canvas>;
}
