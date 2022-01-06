import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Divider, useMediaQuery, Box } from "@chakra-ui/react";
import { formatDate } from "../../utils/formatHelper";
import { LinkIcon } from "@chakra-ui/icons";
import { TableContainer } from "../../components/Table";
import MyStockButton from "../../components/MyStockButton";

export default function ScheduleTable(props) {
  const { filtedData, type } = props;
  const [over768px] = useMediaQuery("(min-width: 768px)");
  let typeIndex = over768px ? 0 : 1;
  type == "排行榜" && (typeIndex = 2);
  return <TableContainer data={filtedData} headers={headers[typeIndex]} RowTemplate={rowTemplates[typeIndex]} />;
}

const headers = [
  [
    { label: "", field: "", style: { fontSize: "md", width: "130px" } },
    { label: "股票", field: "stockNo", style: { fontSize: "md" } },
    { label: "除息日", field: "date", style: { fontSize: "md" } },
    { label: "現金股利", field: "cashDividen", style: { isNumeric: true, fontSize: "md" } },
    { label: "當前股價", field: "price", style: { isNumeric: true, fontSize: "md" } },
    { label: "殖利率", field: "rate", style: { isNumeric: true, fontSize: "md" } },
  ],
  [
    { label: "", field: "", style: { fontSize: "md", width: "130px" } },
    { label: "除息日", field: "date", style: { fontSize: "sm", p: "12px" } },
    { label: "股價", field: "price", style: { isNumeric: true, fontSize: "sm", p: "12px", w: "110px" } },
    { label: "殖利率", field: "rate", style: { isNumeric: true, fontSize: "sm", p: "12px", w: "94px" } },
  ],
  [
    { label: "", field: "", style: { fontSize: "md", width: "130px" } },
    { label: "股票", field: "0", style: { fontSize: "md" } },
    { label: "除息日", field: "9", style: { fontSize: "md" } },
    { label: "殖利率", field: "1", style: { isNumeric: true, fontSize: "md" } },
    { label: "3年平均", field: "2", style: { isNumeric: true, fontSize: "md" } },
    { label: "5年平均", field: "3", style: { isNumeric: true, fontSize: "md" } },
    { label: "當前股價", field: "12", style: { isNumeric: true, fontSize: "md" } },
    { label: "現金股利", field: "5", style: { isNumeric: true, fontSize: "md" } },
    { label: "30天填息率", field: "8", style: { fontSize: "md" } },
  ],
];

const rowTemplates = [
  (props) => {
    const { item, Tr, Td } = props;
    return (
      <Tr _hover={{ bg: "gray.50" }}>
        <Td p={4}>
          <MyStockButton ml="2" stockNo={item.stockNo} />
        </Td>
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
          <MyStockButton ml="2" stockNo={item.stockNo} />
        </Td>
        <Td p="12px">
          <Link
            color="teal.500"
            as={RouterLink}
            to={{
              pathname: `/detail/${item.stockNo}/${item.stockName}`,
            }}
          >
            {`${item.stockName}(${item.stockNo})`}
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
  (props) => {
    const { item, Tr, Td } = props;
    const [stockNo, stockName] = item[0].split(" ");
    return (
      <Tr _hover={{ bg: "gray.50" }}>
        <Td p={4}>
          <MyStockButton ml="2" stockNo={stockNo} />
        </Td>
        <Td p={4}>
          <Link
            color="teal.500"
            _hover={{
              textDecoration: "none",
              color: "teal.800",
            }}
            as={RouterLink}
            to={{
              pathname: `/detail/${stockNo}/${stockName}`,
            }}
          >
            {`${item[0]}`}
          </Link>
        </Td>
        <Td p={4}>{item[9]}</Td>
        <Td p={4} isNumeric>
          {item[1]}
        </Td>
        <Td p={4} isNumeric>
          {item[2]}
        </Td>
        <Td p={4} isNumeric>
          {item[3]}
        </Td>
        <Td p={4} isNumeric>
          {item[12] ? (
            <div>
              <div
                style={{
                  display: "inline-block",
                }}
              >
                {item[12]}
              </div>
              <div style={{ display: "inline-block" }}>{`(${formatDate(item[13])})`}</div>
            </div>
          ) : (
            "--"
          )}
        </Td>
        <Td p={4} isNumeric>
          {item[5]}
        </Td>
        <Td p={4}>{item[8]}</Td>
      </Tr>
    );
  },
];
