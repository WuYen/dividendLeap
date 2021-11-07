import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";

export default function InfoPanel(props) {
  const { data } = props;
  const thisYear = data[0];
  const lastYear = data[1];
  const displayData = [
    { value: "", text: "去年同期EPS" },
    { value: "", text: "去年全年EPS" },
  ];

  let total = [0, 0];
  thisYear.q.forEach((d, idx) => {
    if (d.eps) {
      let eps1 = parseFloat(d.eps);
      total[0] += eps1;
      let eps2 = parseFloat(lastYear.q[idx].eps);
      total[1] += eps2;
    }
  });

  displayData[0].value = ((total[0] / total[1]) * 100).toFixed(2) + "%";
  displayData[1].value = ((parseFloat(thisYear.totalEps) / parseFloat(lastYear.totalEps)) * 100).toFixed(2) + "%";

  return (
    <Box display="flex" m="2">
      {displayData.map((item) => {
        return (
          <Box alignItems="center" p="2" borderRight="1px solid #e0e4e9" _last={{ borderRight: "none" }}>
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
