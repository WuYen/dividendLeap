import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { api } from "../../utils";
import { formatDate, toDateString } from "../../utils/formatHelper";
import "chartjs-adapter-moment";

const colors = ["#319795", "#9A9A96", "#AFAEAC", "#C3C3C1", "#D8D8D6"];

export default function ChartContainer(props) {
  const { stockNo } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/forecast/day/${stockNo}`).then((response) => {
      console.log("chart result", response);
      response.success && setData(response.data);
    });
  }, [stockNo]);

  useEffect(() => {
    if (data) {
      const datasets = data.map((x, index) => {
        return {
          label: x.year,
          data: x.data.reverse().map((x) => x.price),
          borderWidth: 3,
          pointRadius: 0,
          backgroundColor: colors[index],
          borderColor: colors[index],
        };
      });
      const ctx = document.getElementById("myChart");
      const lb = data[0].data.map((x) => x.date);

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: lb,
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
              type: "time",
              time: {
                parser: "YYYYMMDD",
                unit: "month",
                displayFormats: {
                  month: "MMM",
                },
              },
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                //display: false,
                // callback: function (val, index) {
                //   // Hide the label of every 2nd dataset
                //   return index % 4 === 0 ? formatDate(this.getLabelForValue(val)) : "";
                // },
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
          plugins: {
            tooltip: {
              callbacks: {
                title: function (context) {
                  return formatDate(toDateString(new Date(context[0].label)));
                },
                // label: function (context) {
                //   let label = context.dataset.label || "";

                //   if (label) {
                //     label += ": ";
                //   }
                //   if (context.parsed.y !== null) {
                //     label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                //       context.parsed.y
                //     );
                //   }
                //   return label;
                // },
              },
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas id="myChart" width="50" height="16"></canvas>;
}
