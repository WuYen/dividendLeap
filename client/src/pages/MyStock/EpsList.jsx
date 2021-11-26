import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { formatHelper } from "../../utils";

export default function EpsList(props) {
  const { data, isHistory = false } = props;

  const colStyle = [
    { width: "70px" },
    { width: "80px", textAlign: "right" },
    { width: "60px", textAlign: "right" },
    { width: "100px", textAlign: "right" },
    { width: "70px", textAlign: "right" },
    { width: "60px", textAlign: "right" },
    { width: "60px", textAlign: "right" },
    { width: "110px", textAlign: "right" },
    { width: "110px", textAlign: "right" },
  ];

  return (
    <>
      <HStack spacing={2}>
        <div style={colStyle[0]}>發放年度</div>
        <EPS isHeader={true} />
        <div style={colStyle[1]}>{isHistory ? "現金股利" : "預估股利"}</div>
        <div style={colStyle[2]}>分配率</div>
        <div style={colStyle[3]}>{isHistory ? "除息日" : ""}</div>
        <div style={colStyle[4]}>{isHistory ? "除息股價" : ""}</div>
        <div style={colStyle[5]}>{isHistory ? "殖利率" : ""}</div>
        <div style={colStyle[6]}>{isHistory ? "年均價" : ""}</div>
        <div style={colStyle[7]}>{isHistory ? "年低點" : ""}</div>
        <div style={colStyle[8]}>{isHistory ? "年高點" : ""}</div>
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
        const { month, day } = formatHelper.getDateFragment(dDate);
        return (
          <HStack spacing={2} key={index} alignItems="flex-start" mb={4}>
            <div style={colStyle[0]}>{year}</div>
            <EPS eps={totalEps} quarter={q} />
            <div style={colStyle[1]}>{cashDividend ? cashDividend : estimateDividend}</div>
            <div style={colStyle[2]}>{rate}</div>
            <div style={colStyle[3]}>{`${month}-${day}`}</div>
            <div style={colStyle[4]}>{dPrice}</div>
            <div style={colStyle[5]}>{yieldRate}</div>
            <div style={colStyle[6]}>{yearAvg}</div>
            <VStack style={colStyle[7]}>
              <HistoryPrice data={lowLY} />
            </VStack>
            <VStack style={colStyle[8]}>
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
