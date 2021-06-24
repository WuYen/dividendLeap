import React, { useEffect, useContext, useCallback, useState } from "react";
import { dataAPI } from "../../utility/config";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Divider,
  Box,
} from "@chakra-ui/react";
import { formatDate, tryParseFloat } from "../../utility/formatHelper";
import { LinkIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Loading from "../Loading";

function List(props) {
  const [schedule, setSchedule] = useState([]);
  const [sortBy, setSortBy] = useState({});

  useEffect(() => {
    fetch(`${dataAPI}/schedule/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log("schedule list data", data);
        setSchedule(data.data);
      });
  }, []);

  // if (schedule.length === 0) {
  //   return <Loading />;
  // }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"md"}>
              <SortTitle
                text="股票"
                field="stockNo"
                sortBy={sortBy}
                setSort={setSortBy}
              />
            </Th>
            <Th fontSize={"md"}>
              <SortTitle
                text="除息日"
                field="date"
                sortBy={sortBy}
                setSort={setSortBy}
              />
            </Th>
            <Th fontSize={"md"} isNumeric>
              <SortTitle
                text="現金股利"
                field="cashDividen"
                isNumeric
                sortBy={sortBy}
                setSort={setSortBy}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.map((item) => {
            return (
              <Tr key={item.stockNo}>
                <Td>{`${item.stockName}(${item.stockNo})`}</Td>
                <Td>{formatDate(item.date)}</Td>
                <Td isNumeric>{(+item.cashDividen).toFixed(2)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default List;
function SortTitle(props) {
  const { sortBy, setSort } = props;
  const [hover, setHover] = useState(false);
  const isActive = sortBy.field === props.field;
  const Arrow =
    sortBy.type === "asc" ? (
      <ArrowDownIcon
        viewBox="0 0 30 30"
        visibility={hover || isActive ? "visible" : "hidden"}
      />
    ) : (
      <ArrowUpIcon
        viewBox="0 0 30 30"
        visibility={hover || isActive ? "visible" : "hidden"}
      />
    );
  return (
    <div
      onClick={() => {
        setSort((old) => {
          if (old.field === props.field) {
            return {
              field: props.field,
              type: old.type === "asc" ? "desc" : "asc",
            };
          } else {
            return {
              field: props.field,
              type: old.type || "desc",
            };
          }
        });
      }}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {props.isNumeric && Arrow}
      {props.text}
      {!props.isNumeric && Arrow}
    </div>
  );
}
