import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Divider } from "@chakra-ui/react";
import { formatDate } from "../../utils/formatHelper";
import { LinkIcon } from "@chakra-ui/icons";
import { TableContainer } from "../../components/Table";

const headers = [
  [
    { label: "股票", field: "stockNo", style: { fontSize: "md" } },
    { label: "除息日", field: "date", style: { fontSize: "md" } },
    { label: "現金股利", field: "cashDividen", style: { isNumeric: true, fontSize: "md" } },
    { label: "當前股價", field: "price", style: { isNumeric: true, fontSize: "md" } },
    { label: "殖利率", field: "rate", style: { isNumeric: true, fontSize: "md" } },
  ],
  [
    { label: "除息日", field: "date", style: { fontSize: "sm", p: "12px" } },
    { label: "股價", field: "price", style: { isNumeric: true, fontSize: "sm", p: "12px", w: "110px" } },
    { label: "殖利率", field: "rate", style: { isNumeric: true, fontSize: "sm", p: "12px", w: "94px" } },
  ],
];

const rowTemplates = [
  (props) => {
    const { item, Tr, Td } = props;
    return (
      <Tr _hover={{ bg: "gray.50" }}>
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
              {item.priceDate && <div style={{ display: "inline-block" }}>{`(${formatDate(item.priceDate)})`}</div>}
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
  },
  (props) => {
    const { item, Tr, Td } = props;
    return (
      <Tr _hover={{ bg: "gray.50" }}>
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
      </Tr>
    );
  },
];

export default function ScheduleTable(props) {
  const { filtedData } = props;
  let type = props.variant === "md" ? 0 : 1;
  return <TableContainer data={filtedData} headers={headers[type]} RowTemplate={rowTemplates[type]} />;
}
