import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Td, Link, Divider } from "@chakra-ui/react";
import { formatDate } from "../../utils/formatHelper";
import { LinkIcon } from "@chakra-ui/icons";
import { SortTh, SortTr } from "../../components/Table";

function Table(props) {
  const { data } = props;
  return (
    <Table variant="simple">
      <Thead>
        <SortTr sortBy={sortBy} setSortBy={setSortBy}>
          <SortTh field="stockNo" fontSize={"md"}>
            年度
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            Q1
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            Q2
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            Q3
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            Q4
          </SortTh>
          <SortTh field="date" fontSize={"md"}>
            EPS
          </SortTh>
          <SortTh field="cashDividen" fontSize={"md"} isNumeric>
            預估股利
          </SortTh>
          <SortTh field="price" fontSize={"md"} isNumeric>
            分配率
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
                {item.priceBefore && <div>除息前: {item.priceBefore}</div>}
                {item.price ? (
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                      }}
                    >
                      {item.price?.toFixed(2)}
                    </div>
                    {item.priceDate && (
                      <div style={{ display: "inline-block" }}>{`(${formatDate(item.priceDate)})`}</div>
                    )}
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

export default React.memo(Table);
