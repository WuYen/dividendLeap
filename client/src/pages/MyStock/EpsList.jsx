import React from "react";
import { HStack, VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { formatHelper } from "../../utils";

// function EpsList(props) {
//   const { data, isHistory = false } = props;

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

//   return (
//     <>
//       <HStack spacing={2}>
//         <div style={colStyle[0]}>發放年度</div>
//         <EPS isHeader={true} />
//         <div style={colStyle[1]}>{isHistory ? "現金股利" : "預估股利"}</div>
//         <div style={colStyle[2]}>分配率</div>
//         <div style={colStyle[3]}>除息日</div>
//         <div style={colStyle[4]}>{isHistory ? "除息股價" : ""}</div>
//         <div style={colStyle[5]}>{isHistory ? "殖利率" : ""}</div>
//         <div style={colStyle[6]}>{isHistory ? "年均價" : ""}</div>
//         <div style={colStyle[7]}>{isHistory ? "年低點" : ""}</div>
//         <div style={colStyle[8]}>{isHistory ? "年高點" : ""}</div>
//       </HStack>
//       {data.map((d, index) => {
//         const {
//           cashDividend,
//           estimateDividend,
//           q,
//           rate,
//           totalEps,
//           year,
//           dDate,
//           dPrice,
//           yieldRate,
//           yearAvg,
//           lowLY,
//           HighLY,
//         } = d;
//         const { month, day } = formatHelper.getDateFragment(dDate);
//         return (
//           <HStack spacing={2} key={index} alignItems="flex-start" mb={4}>
//             <div style={colStyle[0]}>{year}</div>
//             <EPS eps={totalEps} quarter={q} />
//             <div style={colStyle[1]}>{cashDividend ? cashDividend : estimateDividend}</div>
//             <div style={colStyle[2]}>{rate}</div>
//             <div style={colStyle[3]}>{`${month}-${day}`}</div>
//             <div style={colStyle[4]}>{dPrice}</div>
//             <div style={colStyle[5]}>{yieldRate}</div>
//             <div style={colStyle[6]}>{yearAvg}</div>
//             <VStack style={colStyle[7]}>
//               <HistoryPrice data={lowLY} />
//             </VStack>
//             <VStack style={colStyle[8]}>
//               <HistoryPrice data={HighLY} />
//             </VStack>
//           </HStack>
//         );
//       })}
//     </>
//   );
// }

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

// function EPS(props) {
//   const { eps = "", quarter = [], isHeader = false } = props;
//   return (
//     <HStack>
//       <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q1" : quarter[0]?.eps || ""}</div>
//       <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q2" : quarter[1]?.eps || ""}</div>
//       <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q3" : quarter[2]?.eps || ""}</div>
//       <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "Q4" : quarter[3]?.eps || ""}</div>
//       <div style={{ width: "50px", textAlign: "right" }}>{isHeader ? "EPS" : eps}</div>
//     </HStack>
//   );
// }

export default function EpsTable(props) {
  const { data } = props;
  return (
    <Table variant="simple">
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
      <Th>{isHistory ? "現金股利" : "預估股利"}</Th>
      <Th>分配率</Th>
      <Th>除息日</Th>
      <Th>{isHistory ? "除息股價" : ""}</Th>
      <Th>{isHistory ? "殖利率" : ""}</Th>
      <Th>{isHistory ? "年均價" : ""}</Th>
      <Th>{isHistory ? "年低點" : ""}</Th>
      <Th>{isHistory ? "年高點" : ""}</Th>
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
        <Td>{d.totalEps}</Td>
        <Td>{isHistory ? d.cashDividend : d.estimateDividend}</Td>
        <Td>{d.rate}</Td>
        <Td>{`${month}-${day}`}</Td>
        <Td>{d.dPrice}</Td>
        <Td>{d.yieldRate}</Td>
        <Td>{d.yearAvg}</Td>
        <Td>
          <HistoryPrice data={d.lowLY} />
        </Td>
        <Td>
          <HistoryPrice data={d.HighLY} />
        </Td>
      </Tr>
    );
  });
}
