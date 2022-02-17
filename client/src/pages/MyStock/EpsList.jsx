import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { formatHelper } from "../../utils";

//   const colStyle = [
//     { width: "70px" }, //0
//     { width: "80px", textAlign: "right" }, //1
//     { width: "70px", textAlign: "right" }, //2
//     { width: "70px", textAlign: "right" }, //3
//     { width: "80px", textAlign: "right" }, //4
//     { width: "60px", textAlign: "right" }, //5
//     { width: "60px", textAlign: "right" }, //6
//     { width: "110px", textAlign: "right" }, //7
//     { width: "110px", textAlign: "right" }, //8
//   ];

export default function EpsTable(props) {
  const { data } = props;
  return (
    <Table variant="simple" size={"sm"}>
      <Thead>
        <TableHeaderTemplate isHistory={false} />
      </Thead>
      <Tbody>
        <TableRowTemplate data={[data[0]]} isHistory={false} />
      </Tbody>
      <Thead>
        <TableHeaderTemplate isHistory={true} />
      </Thead>
      <Tbody>
        <TableRowTemplate data={data.slice(1)} isHistory={true} />
      </Tbody>
    </Table>
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

function TableHeaderTemplate(props) {
  const { isHistory } = props;
  return (
    <Tr>
      <Th>發放年度</Th>
      <Th isNumeric>Q1</Th>
      <Th isNumeric>Q2</Th>
      <Th isNumeric>Q3</Th>
      <Th isNumeric>Q4</Th>
      <Th isNumeric>EPS</Th>
      <Th isNumeric>{isHistory ? "現金股利" : "預估股利"}</Th>
      <Th>分配率</Th>
      <Th>除息日</Th>
      <Th isNumeric>{isHistory ? "除息股價" : ""}</Th>
      <Th isNumeric>{isHistory ? "殖利率" : ""}</Th>
      <Th isNumeric>{isHistory ? "年均價" : ""}</Th>
      <Th isNumeric>{isHistory ? "年低點" : ""}</Th>
      <Th isNumeric>{isHistory ? "年高點" : ""}</Th>
    </Tr>
  );
}
function TableRowTemplate(props) {
  const { data, isHistory } = props;
  return data.map((d) => {
    const { month, day } = formatHelper.getDateFragment(d.dDate);
    return (
      <Tr key={d.year}>
        <Td>{d.year}</Td>
        <Td isNumeric>{d.q[0]?.eps || "--"}</Td>
        <Td isNumeric>{d.q[1]?.eps || "--"}</Td>
        <Td isNumeric>{d.q[2]?.eps || "--"}</Td>
        <Td isNumeric>{d.q[3]?.eps || "--"}</Td>
        <Td isNumeric>{d.totalEps}</Td>
        <Td>{isHistory ? d.cashDividend : d.estimateDividend}</Td>
        <Td>{d.rate}</Td>
        <Td>{`${month}-${day}`}</Td>
        <Td isNumeric>{d.dPrice}</Td>
        <Td isNumeric>{d.yieldRate}</Td>
        <Td isNumeric>{d.yearAvg}</Td>
        <Td isNumeric>
          <HistoryPrice data={d.lowLY} />
        </Td>
        <Td isNumeric>
          <HistoryPrice data={d.HighLY} />
        </Td>
      </Tr>
    );
  });
}
