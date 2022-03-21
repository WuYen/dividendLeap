import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";
import { SortTh, SortTr } from "./index";

export default function TableContainer(props) {
  const { headers, RowTemplate, data } = props;
  const [sortBy, setSortBy] = useState({});

  let sortedData = data;
  if (sortBy.field) {
    sortedData = data.sort((a, b) => {
      const isAscending = sortBy.type === "asc";
      try {
        let value1 = +a[sortBy.field];
        let value2 = +b[sortBy.field];
        if (value1 < value2) {
          return isAscending ? 1 : -1;
        }
        if (value1 > value2) {
          return isAscending ? -1 : 1;
        }
      } catch (error) {
        console.log("ScheduleTable sort fail", error);
      }
      return 0;
    });
  }

  return (
    <Table variant="simple">
      <Thead>
        <SortTr sortBy={sortBy} setSortBy={setSortBy}>
          {headers.map((header) => {
            return (
              <SortTh key={header.field} field={header.field} fontSize={"md"} {...header.style}>
                {header.label}
              </SortTh>
            );
          })}
        </SortTr>
      </Thead>
      <Tbody>
        {sortedData.map((item, idx) => {
          return <RowTemplate item={item} key={idx} Tr={Tr} Td={Td} />;
        })}
      </Tbody>
    </Table>
  );
}
