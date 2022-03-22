import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";

export default function InfoPanel(props) {
  const { data, stockDetail, revenue } = props;
  const thisYear = data[0];
  const lastYear = data[1];
  const displayData = [
    { value: "", text: "去年同期EPS" },
    { value: "", text: "去年全年EPS" },
    { value: "", text: "去年全年獲利" },
    { value: isNaN(stockDetail.rateAvg5) ? "--" : stockDetail.rateAvg5 + "%", text: "5年平均殖利率" },
    { value: isNaN(stockDetail.rateAvg10) ? "--" : stockDetail.rateAvg10 + "%", text: "10年平均殖利率" },
  ];

  let total = [0, 0];
  thisYear.q.forEach((d, idx) => {
    if (d.eps) {
      let eps1 = parseFloat(d.eps);
      total[0] += eps1; //this year
      let eps2 = parseFloat(lastYear.q[idx].eps);
      total[1] += eps2; //last year
    }
  });

  displayData[0].value = ((total[0] / total[1]) * 100).toFixed(2) + "%";
  displayData[1].value = ((parseFloat(thisYear.totalEps) / parseFloat(lastYear.totalEps)) * 100).toFixed(2) + "%";
  displayData[2].value = getRevenueRate(revenue);

  return (
    <Box display="flex" m="2">
      {displayData.map((item, index) => {
        return (
          <Box key={index} alignItems="center" p="2" borderRight="1px solid #e0e4e9" _last={{ borderRight: "none" }}>
            <Box textAlign="center" mb="4px" display="block" fontWeight="700" fontSize="16px">
              {item.value}
            </Box>
            <Box textAlign="center" display="block" color="#6e7780" fontSize="12px">
              {item.text}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function getRevenueRate(revenue = []) {
  var sum = (acc, next) => {
    return acc + next.revenue;
  };
  var rThis = revenue.find((x) => x.year == 2021)?.data;
  var rLast = revenue.find((x) => x.year == 2020)?.data;
  if (rThis && rLast) {
    var totalThis = rThis.reduce(sum, 0);
    var totalLast = rLast.reduce(sum, 0);
    return ((totalThis / totalLast) * 100).toFixed(2) + "%";
  }
  return "--";
}
