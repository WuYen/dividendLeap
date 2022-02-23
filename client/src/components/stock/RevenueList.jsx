import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from "@chakra-ui/react";
import { formatHelper } from "../../utilities";

export default function RevenueList(props) {
  const { data } = props;
  console.log("RevenueList", data);
  return (
    <>
      {/* <Text fontSize="lg" color={"teal"}>
        Revenue
      </Text> */}
      <Table variant="simple" size={"sm"}>
        <TableCaption>單位:百萬</TableCaption>
        <Thead>
          <TableHeaderTemplate />
        </Thead>
        <Tbody>
          <TableRowTemplate data={data} />
        </Tbody>
      </Table>
    </>
  );
}
function TableHeaderTemplate(props) {
  return (
    <Tr>
      <Th>獲利年度</Th>
      <Th isNumeric>1</Th>
      <Th isNumeric>2</Th>
      <Th isNumeric>3</Th>
      <Th isNumeric>4</Th>
      <Th isNumeric>5</Th>
      <Th isNumeric>6</Th>
      <Th isNumeric>7</Th>
      <Th isNumeric>8</Th>
      <Th isNumeric>9</Th>
      <Th isNumeric>10</Th>
      <Th isNumeric>11</Th>
      <Th isNumeric>12</Th>
      <Th isNumeric>總和</Th>
    </Tr>
  );
}
function TableRowTemplate(props) {
  const { data } = props;
  return data.reverse().map((d) => {
    let total = d.data.reduce((acc, next) => {
      return acc + next.revenue;
    }, 0);
    let totalInMillians = (total / 1000000).toFixed(0);

    let tdByMonths = [];
    for (let index = 0; index < 12; index++) {
      const element = d.data[index];
      if (element) {
        let millians = element.revenue / 1000000;
        let trim = millians > 0 ? millians.toFixed(0) : millians.toFixed(3);
        tdByMonths.push(<Td isNumeric>{numberWithCommas(trim)}</Td>);
      } else {
        tdByMonths.push(<Td isNumeric></Td>);
      }
    }

    return (
      <Tr key={d.year}>
        <Td>{d.year}</Td>
        {tdByMonths}
        <Td isNumeric>{numberWithCommas(totalInMillians)}</Td>
      </Tr>
    );
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
