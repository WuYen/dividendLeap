import React, { useEffect, useState } from "react";
import { formatDate } from "../../utility/formatHelper";
import api from "../../utility/api";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Divider, useBreakpointValue } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Loading from "../Common/Loading";

function DividendDetail(props) {
  const [data, setData] = useState(null);
  const { stockNo, name } = useParams();
  const variant = useBreakpointValue({
    base: "sm",
    sm: "sm",
    md: "md",
  });

  useEffect(() => {
    api.get(`/stock/detail/${stockNo}`).then((data) => {
      console.log("data", data);
      setData(data.data);
    });
  }, [stockNo]);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {variant === "sm" && (
        <Box w="100%" p={4}>
          <Link
            color="teal.500"
            as={RouterLink}
            _hover={{
              textDecoration: "none",
              color: "teal.800",
            }}
            to={{
              pathname: `/`,
            }}
          >
            回列表
            <LinkIcon mx="4px" viewBox="0 0 30 30" />
          </Link>
        </Box>
      )}

      <Box d="flex" flexWrap="wrap" alignItems="baseline">
        <Box m="4" color="gray.600">
          名稱:
          <Divider />
          {`${name} (${stockNo})`}
        </Box>
        <Box m="4" color="gray.600">
          除息日:
          <Divider /> {formatDate(data.dDate)}
        </Box>
        <Box m="4" color="gray.600">
          今年殖利率:
          <Divider /> {data.rate}%
        </Box>
        <Box m="4" color="gray.600">
          當前股價:
          <Divider /> {data.price}({formatDate(data.priceDate)})
        </Box>
        <Box m="4" color="gray.600">
          現金股利:
          <Divider /> {data.dCash}
        </Box>
        <Box m="4" color="gray.600">
          去年殖利率:
          <Divider /> {data.rateLY}%
        </Box>
        <Box m="4" color="gray.600">
          前五年平均殖利率:
          <Divider /> {data.rateAvg5}%
        </Box>
        <Box m="4" color="gray.600">
          前十年平均殖利率:
          <Divider /> {data.rateAvg10}%
        </Box>
        <Box m="4" color="gray.600">
          去年除息股價:
          <Divider /> {data.priceLY}
        </Box>
        <Box m="4" color="gray.600">
          去年除息日:
          <Divider /> {formatDate(data.dDateLY)}
        </Box>
        <Box m="4" color="gray.600">
          去年填滿息日:
          <Divider /> {formatDate(data.dFDayLY)}
        </Box>
        <Box m="4" color="gray.600">
          去年低點:
          <Divider />
          <HistoryPrice data={data.lowLY} />
        </Box>
        <Box m="4" color="gray.600">
          去年高點:
          <Divider />
          <HistoryPrice data={data.HighLY} />
        </Box>
      </Box>
    </>
  );
}

function HistoryPrice(props) {
  return props.data.map((item, index) => {
    return item ? (
      <div key={item.date}>{`${item.price} (${formatDate(item.date)})`}</div>
    ) : (
      <div key={index}>--</div>
    );
  });
}

export default DividendDetail;
