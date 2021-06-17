import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { LinkIcon } from "@chakra-ui/icons";

function ScheduleTable(props) {
  const { data, filter } = props;
  let filtedData = filter
    ? data.filter((x) => tryParseFloat(x.rate) > 5)
    : data;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th fontSize={"md"}>股票</Th>
          <Th fontSize={"md"}>除息日</Th>
          <Th fontSize={"md"} isNumeric>
            現金股利
          </Th>
          <Th fontSize={"md"} isNumeric>
            當前股價
          </Th>
          <Th fontSize={"md"} isNumeric>
            現金殖利率 %
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {filtedData.map((item) => {
          return (
            <Tr key={item.stockNo}>
              <Td>
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
              </Td>
              <Td>{formatDate(item.date)}</Td>
              <Td isNumeric>{(+item.cashDividen).toFixed(2)}</Td>
              <Td isNumeric>
                {item.price ? (
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                      }}
                    >
                      {item.price.toFixed(2)}
                    </div>
                    <div style={{ display: "inline-block" }}>{`(${formatDate(
                      item.priceDate
                    )})`}</div>
                  </div>
                ) : (
                  "--"
                )}
              </Td>
              <Td isNumeric>{item.rate}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default ScheduleTable;
