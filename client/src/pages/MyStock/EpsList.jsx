import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { formatHelper } from "../../utils";

export default function EpsList(props) {
  const { data, isHistory = false } = props;

  return (
    <>
      <HStack spacing={2}>
        <div style={{ width: "70px" }}>發放年度</div>
        <EPS isHeader={true} />
        <div style={{ width: "80px", textAlign: "right" }}>{isHistory ? "現金股利" : "預估股利"}</div>
        <div style={{ width: "60px", textAlign: "right" }}>分配率</div>
        <div style={{ width: "100px", textAlign: "right" }}>{isHistory ? "除息日" : ""}</div>
        <div style={{ width: "70px", textAlign: "right" }}>{isHistory ? "除息股價" : ""}</div>
        <div style={{ width: "60px", textAlign: "right" }}>{isHistory ? "殖利率" : ""}</div>
        <div style={{ width: "60px", textAlign: "right" }}>{isHistory ? "年均價" : ""}</div>
        <div style={{ width: "110px", textAlign: "right" }}>{isHistory ? "年低點" : ""}</div>
        <div style={{ width: "110px", textAlign: "right" }}>{isHistory ? "年高點" : ""}</div>
      </HStack>
      {data.map((d, index) => {
        const {
          cashDividend,
          estimateDividend,
          q,
          rate,
          totalEps,
          year,
          dDate,
          dPrice,
          yieldRate,
          yearAvg,
          lowLY,
          HighLY,
        } = d;
        return (
          <HStack spacing={2} key={index} alignItems="flex-start" mb={4}>
            <div style={{ width: "70px" }}>{year}</div>
            <EPS eps={totalEps} quarter={q} />
            <div style={{ width: "80px", textAlign: "right" }}>{cashDividend ? cashDividend : estimateDividend}</div>
            <div style={{ width: "60px", textAlign: "right" }}>{rate}</div>
            <div style={{ width: "100px", textAlign: "right" }}>{formatHelper.formatDate(dDate)}</div>
            <div style={{ width: "70px", textAlign: "right" }}>{dPrice}</div>
            <div style={{ width: "60px", textAlign: "right" }}>{yieldRate}</div>
            <div style={{ width: "60px", textAlign: "right" }}>{yearAvg}</div>
            <VStack style={{ width: "110px", textAlign: "right" }}>
              <HistoryPrice data={lowLY} />
            </VStack>
            <VStack style={{ width: "110px", textAlign: "right" }}>
              <HistoryPrice data={HighLY} />
            </VStack>
          </HStack>
        );
      })}
    </>
  );
}

function HistoryPrice(props) {
  const { data = [] } = props;

  return data.map((item, index) => {
    const { month, day } = formatHelper.getDateFragment(item.date);
    return item ? (
      <div key={item.date} style={{ width: "100%" }}>{`${item.price} (${month}-${day})`}</div>
    ) : (
      <div key={index}>--</div>
    );
  });
}

function EPS(props) {
  const { eps = "", quarter = [], isHeader = false } = props;
  return (
    <HStack>
      <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q1" : quarter[0]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q2" : quarter[1]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q3" : quarter[2]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q4" : quarter[3]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "EPS" : eps}</div>
    </HStack>
  );
}
