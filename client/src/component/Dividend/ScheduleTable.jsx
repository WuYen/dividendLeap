import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Td, Link, Divider } from "@chakra-ui/react";
import { formatDate } from "../../utility/formatHelper";
import { LinkIcon } from "@chakra-ui/icons";
import { SortTh, SortTr } from "../Common/Table";

function NormalTable(props) {
  const { sortBy, setSortBy, data } = props;

  return (
    <Table variant="simple">
      <Thead>
        <SortTr sortBy={sortBy} setSortBy={setSortBy}>
          <SortTh field="stockNo" fontSize={"md"}>
            股票
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            除息日
          </SortTh>
          <SortTh field="cashDividen" fontSize={"md"} isNumeric>
            現金股利
          </SortTh>
          <SortTh field="price" fontSize={"md"} isNumeric>
            當前股價
          </SortTh>
          <SortTh field="rate" fontSize={"md"} isNumeric>
            殖利率
          </SortTh>
        </SortTr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => {
          return (
            <Tr key={item.stockNo + idx} _hover={{ bg: "gray.50" }}>
              <Td p={4}>
                <Link
                  color="teal.500"
                  _hover={{
                    textDecoration: "none",
                    color: "teal.800",
                  }}
                  as={RouterLink}
                  to={{
                    pathname: `/detail/${item.stockNo}/${item.stockName}`,
                  }}
                >
                  {`${item.stockName}(${item.stockNo})`}
                  <LinkIcon mx="4px" viewBox="0 0 30 30" />
                </Link>
              </Td>
              <Td p={4}>{formatDate(item.date)}</Td>
              <Td p={4} isNumeric>
                {(+item.cashDividen).toFixed(2)}
              </Td>
              <Td p={4} isNumeric>
                {item.price ? (
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                      }}
                    >
                      {item.price.toFixed(2)}
                    </div>
                    <div style={{ display: "inline-block" }}>
                      {`(${formatDate(item.priceDate)})`}
                    </div>
                  </div>
                ) : (
                  "--"
                )}
              </Td>
              <Td p={4} isNumeric>
                {item.rate ? item.rate + " %" : "--"}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function SmallTable(props) {
  const { sortBy, setSortBy, data } = props;
  return (
    <Table variant="simple">
      <Thead>
        <SortTr sortBy={sortBy} setSortBy={setSortBy}>
          <SortTh field="date" fontSize={"sm"} p="12px">
            除息日
          </SortTh>
          <SortTh field="price" isNumeric fontSize={"sm"} p="12px" w="110px">
            股價
          </SortTh>
          <SortTh field="rate" isNumeric fontSize={"sm"} p="12px" w="94px">
            殖利率
          </SortTh>
        </SortTr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => {
          return (
            <SortTr key={item.stockNo + idx}>
              <Td p="12px">
                <Link
                  color="teal.500"
                  as={RouterLink}
                  to={{
                    pathname: `/detail/${item.stockNo}/${item.stockName}`,
                  }}
                >
                  {`${item.stockName}(${item.stockNo})`}
                  <LinkIcon mx="4px" viewBox="0 0 30 30" />
                </Link>
                <Divider />
                {formatDate(item.date)}
              </Td>
              <Td p="12px" isNumeric>
                {item.price ? (
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                      }}
                    >
                      {item.price.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  "--"
                )}
                <Divider />
                股利: {(+item.cashDividen).toFixed(2)}
              </Td>
              <Td p="12px" isNumeric>
                {item.rate ? item.rate + " %" : "--"}
              </Td>
            </SortTr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function ScheduleTable(props) {
  const { filtedData } = props;
  const [sortBy, setSortBy] = useState({});
  let sortedData = filtedData;
  if (sortBy.field) {
    sortedData = filtedData.sort((a, b) => {
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

  return props.variant === "md" ? (
    <NormalTable sortBy={sortBy} setSortBy={setSortBy} data={sortedData} />
  ) : (
    <SmallTable sortBy={sortBy} setSortBy={setSortBy} data={sortedData} />
  );
}

export default React.memo(ScheduleTable);
