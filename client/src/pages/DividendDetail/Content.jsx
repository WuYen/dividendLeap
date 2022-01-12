import React, { useEffect, useState, useRef } from "react";
import { Box, Divider, useBreakpointValue } from "@chakra-ui/react";
import api, { ScheduleAPI } from "../../utils/api";
import { formatHelper } from "../../utils";
import * as MyStock from "../../pages/MyStock/Content";
import Loading from "../../components/Loading";
import StockFrame from "./StockFrame";
import ControlPanel from "./ControlPanel";

const breakPoints = {
  base: "sm",
  sm: "sm",
  md: "md",
};

export function usePageInfo(props) {
  const { stockNo, name } = props;
  const [pageInfo, setPageInfo] = useState({
    isLoading: true,
    hasError: false,
    data: null,
    stockNo,
    name,
  });

  useEffect(() => {
    ScheduleAPI.getDetail(stockNo).then((data) => {
      console.log("data", data);
      if (data.success) {
        setPageInfo({
          stockNo,
          name,
          isLoading: false,
          data: data.data,
        });
      } else {
        setPageInfo({
          stockNo,
          name,
          isLoading: false,
          data: null,
          hasError: true,
        });
      }
    });
  }, [stockNo]);

  return [pageInfo, setPageInfo];
}

export default function Content(props) {
  const { name, stockNo, data, hasError, isLoading } = props;

  return isLoading ? (
    <Loading />
  ) : hasError ? (
    <div>Data not available</div>
  ) : (
    <Detail stockNo={stockNo} name={name} data={data} />
  );
}

export function Detail(props) {
  const { stockNo, name, data } = props;
  const variant = useBreakpointValue(breakPoints);
  const [myData, myLoading] = MyStock.useFetchData(stockNo);

  return (
    <Box m="4" color="gray.600">
      <MyStock.Content stockNo={stockNo} data={myData} loading={myLoading} />
    </Box>
  );
}

// function Display(props) {
//   const { stockNo, name, data = {} } = props;
//   const info = [
//     { label: "名稱", content: `${name} (${stockNo})` },
//     { label: "除息日", content: formatHelper.formatDate(data.dDate) },
//     { label: "今年殖利率", content: `${data.rate}%` },
//     { label: "當前股價", content: `${data.price}(${formatHelper.formatDate(data.priceDate)})` },
//     { label: "現金股利", content: data.dCash },
//     { label: "去年殖利率", content: `${data.rateLY}%` },
//     { label: "前五年平均殖利率", content: `${data.rateAvg5}%` },
//     { label: "前十年平均殖利率", content: `${data.rateAvg10}%` },
//     { label: "去年除息股價", content: data.priceLY },
//     { label: "去年除息日", content: formatHelper.formatDate(data.dDateLY) },
//     { label: "去年填滿息日", content: formatHelper.formatDate(data.dFDayLY) },
//     { label: "去年低點", content: <HistoryPrice data={data.lowLY} /> },
//     { label: "去年高點", content: <HistoryPrice data={data.HighLY} /> },
//   ];
//   return info.map((item) => (
//     <Box m="4" color="gray.600">
//       {item.label}:
//       <Divider />
//       {item.content}
//     </Box>
//   ));
// }

// function HistoryPrice(props) {
//   return props.data.map((item, index) => {
//     return item ? (
//       <div key={item.date}>{`${item.price} (${formatHelper.formatDate(item.date)})`}</div>
//     ) : (
//       <div key={index}>--</div>
//     );
//   });
// }
