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
    { value: stockDetail.rateAvg5, text: "5年平均殖利率" },
    { value: stockDetail.rateAvg10, text: "10年平均殖利率" },
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

function getRevenueRate(revenue) {
  var sum = (acc, next) => {
    return acc + next.revenue;
  };
  var revenueThis = revenue.filter((x) => x.revenue_year == 2021);
  var revenueLast = revenue.filter((x) => x.revenue_year == 2020);
  var totalRevenueThis = revenueThis.reduce(sum, 0);
  var totalRevenueLast = revenueLast.reduce(sum, 0);
  return ((totalRevenueThis / totalRevenueLast) * 100).toFixed(2) + "%";
  // {
  //   country: "Taiwan";
  //   date: "2016-01-01";
  //   revenue: 5867232000;
  //   revenue_month: 12;
  //   revenue_year: 2015;
  //   stock_id: "1102";
  // }
}
