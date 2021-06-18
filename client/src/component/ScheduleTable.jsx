import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { formatDate, tryParseFloat } from "../utility/formatHelper";
import { LinkIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

function NormalTable(props) {
  const { sortBy, setSortBy, data } = props;

  return (
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
          <Th fontSize={"md"} isNumeric>
            <SortTitle
              text="當前股價"
              field="price"
              isNumeric
              sortBy={sortBy}
              setSort={setSortBy}
            />
          </Th>
          <Th fontSize={"md"} isNumeric>
            <SortTitle
              text="殖利率"
              field="rate"
              isNumeric
              sortBy={sortBy}
              setSort={setSortBy}
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => {
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
              <Td isNumeric>{item.rate ? item.rate + " %" : "--"}</Td>
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
        <Tr>
          <Th fontSize={"md"}>
            <SortTitle
              text="股票"
              field="stockNo"
              sortBy={sortBy}
              setSort={setSortBy}
            />
          </Th>
          <Th fontSize={"md"} isNumeric>
            <SortTitle
              text="股利"
              field="cashDividen"
              sortBy={sortBy}
              setSort={setSortBy}
            />
          </Th>
          <Th fontSize={"md"} isNumeric w="100px">
            <SortTitle
              text="股價"
              field="price"
              sortBy={sortBy}
              setSort={setSortBy}
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => {
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
                <Divider />
                除息日:
                <br /> {formatDate(item.date)}
              </Td>

              <Td isNumeric>
                {(+item.cashDividen).toFixed(2)}
                <Divider />
                殖利率: {item.rate ? item.rate + " %" : "--"}
              </Td>
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
                  </div>
                ) : (
                  "--"
                )}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function SortTitle(props) {
  const { sortBy, setSort } = props;
  const [hover, setHover] = useState(false);
  const isActive = sortBy.field === props.field;
  const Arrow =
    sortBy.type == "asc" ? (
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
          if (old.field == props.field) {
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

function ScheduleTable(props) {
  const variant = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
  });

  const { data, filter } = props;
  const [sortBy, setSortBy] = useState({});
  let filtedData = filter
    ? data.filter((x) => tryParseFloat(x.rate) > 5)
    : data;
  if (sortBy.field) {
    filtedData = filtedData.sort((a, b) => {
      if (a[sortBy.field] < b[sortBy.field]) {
        return sortBy.type == "asc" ? 1 : -1;
      }
      if (a[sortBy.field] > b[sortBy.field]) {
        return sortBy.type == "asc" ? -1 : 1;
      }
      return 0;
    });
  }

  return variant == "md" ? (
    <NormalTable sortBy={sortBy} setSortBy={setSortBy} data={filtedData} />
  ) : (
    <SmallTable sortBy={sortBy} setSortBy={setSortBy} data={filtedData} />
  );
}
export default ScheduleTable;
