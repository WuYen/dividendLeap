import React, { useState } from "react";
import { Box, Flex, Spacer, Link } from "@chakra-ui/layout";
import MyStockButton from "./MyStockButton";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function ListView(props) {
  const history = useHistory();
  const { data } = props;
  const { meta, dividend, info } = data;
  return (
    <Box>
      <Box
        m="2"
        display="inline-block"
        boxShadow="0px 6px 10px rgba(0, 0, 0, 0.20)"
        p="4"
        rounded="xl"
        minW={"700px"}
        _hover={{ boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.40)" }}
      >
        <Flex alignItems="center">
          <Flex fontSize="20px" fontWeight="600" alignItems="center" w="220px">
            <Link
              display={"flex"}
              color="teal.500"
              _hover={{
                textDecoration: "none",
                color: "teal.800",
              }}
              as={RouterLink}
              _focus={{ outline: "none" }}
              to={{
                pathname: `/detail/${meta.no}/${meta.nm}`,
              }}
            >
              <Box mr="2" color="teal.600">
                {meta.nm}
              </Box>
              <Box mr="4" color="teal.500" fontWeight="500">
                {meta.no}
              </Box>
            </Link>
            <Box fontSize="sm" color="teal.400" backgroundColor="teal.50" px="2" rounded={"full"} maxW="80px">
              {meta.industry}
            </Box>
          </Flex>
          <Box fontSize="sm" fontWeight="350" mr="4">
            除息日: {dividend.date}
          </Box>
          <Box fontSize="sm" fontWeight="350" mr="4">
            現金股利: {dividend.cash}
          </Box>
          <Box fontSize="sm" fontWeight="350" mr="4">
            殖利率: {dividend.rate}%
          </Box>
          <Spacer />
          <MyStockButton withText={true} stockNo={meta.no} />
        </Flex>
        <Flex alignItems="flex-end">
          <Box w="220px">
            <Box mb="4px" display="block" fontWeight="700" fontSize="20px">
              {meta.price}
            </Box>
            <Box display="block" color="#6e7780" fontSize="12px">
              {meta.priceDt} 更新
            </Box>
          </Box>
          {info.map((item, index) => {
            return (
              <Box
                key={index}
                alignItems="center"
                borderRight="1px solid #e0e4e9"
                mr="2"
                pr="2"
                _last={{ borderRight: "none", mr: "0", pr: "0" }}
              >
                <Box textAlign="center" mb="4px" display="block" fontWeight="700" fontSize="16px">
                  {item.value ? item.value + "%" : "--"}
                </Box>
                <Box textAlign="center" display="block" color="#6e7780" fontSize="12px">
                  {item.text}
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
