import React from "react";
import { HStack } from "@chakra-ui/react";
import { formatHelper } from "../../utils";

export default function EpsList(props) {
  const { data, extend = false } = props;

  return (
    <>
      <HStack spacing={3}>
        <div style={{ width: "80px" }}>發放年度</div>
        <HStack>
          <div style={{ width: "50px", textAlign: "right" }}>Q1</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q2</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q3</div>
          <div style={{ width: "50px", textAlign: "right" }}>Q4</div>
          <div style={{ width: "50px", textAlign: "right" }}>EPS</div>
        </HStack>
        <div style={{ width: "80px", textAlign: "right" }}>預估股利</div>
        <div style={{ width: "80px", textAlign: "right" }}>分配率</div>
        <div style={{ width: "100px", textAlign: "right" }}>{extend ? "除息日" : ""}</div>
        <div style={{ width: "80px", textAlign: "right" }}>{extend ? "除息股價" : ""}</div>
        <div style={{ width: "80px", textAlign: "right" }}>{extend ? "殖利率" : ""}</div>
        <div style={{ width: "80px", textAlign: "right" }}>{extend ? "年均價" : ""}</div>
      </HStack>
      {data.map((d, index) => {
        const { cashDividend, estimateDividend, q, rate, totalEps, year, dDate, dPrice, yieldRate, yearAvg } = d;
        return (
          <HStack spacing={3} key={index}>
            <div style={{ width: "80px" }}>{year}</div>
            <EPS eps={totalEps} quarter={q} />
            <div style={{ width: "80px", textAlign: "right" }}>{cashDividend ? cashDividend : estimateDividend}</div>
            <div style={{ width: "80px", textAlign: "right" }}>{rate}</div>
            <div style={{ width: "100px", textAlign: "right" }}>{formatHelper.formatDate(dDate)}</div>
            <div style={{ width: "80px", textAlign: "right" }}>{dPrice}</div>
            <div style={{ width: "80px", textAlign: "right" }}>{yieldRate}</div>
            <div style={{ width: "80px", textAlign: "right" }}>{yearAvg}</div>
          </HStack>
        );
      })}
    </>
  );
}

function EPS(props) {
  const { eps, quarter } = props;
  return (
    <HStack>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[0]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[1]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[2]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{quarter[3]?.eps || ""}</div>
      <div style={{ width: "50px", textAlign: "right" }}>{eps}</div>
    </HStack>
  );
}
