import React, { useState } from "react";
import { api } from "../../utils";
import { Center, Box } from "@chakra-ui/layout";

export default function Validation(props) {
  const [isFirst, setisFirst] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    token: null,
    result: null,
  });
  if (isFirst) {
    setisFirst(false);
    let t = new URLSearchParams(window.location.search).get("t");
    if (t) {
      setPageInfo({
        token: t,
        result: null,
      });
      api.post("/user/accountvalidate", JSON.stringify({ token: t })).then((res) => {
        setPageInfo({
          token: pageInfo.token,
          result: res.result,
        });
      });
    }
  }
  return (
    <Center>
      <Box
        borderWidth="1px"
        rounded="lg"
        p={4}
        w="100%"
        h="300px"
        maxWidth="1000px"
        color={pageInfo.result ? "green.600" : "red.600"}
        fontSize="6xl"
        textAlign="center"
      >
        {pageInfo.result ? "帳號驗證成功" : "帳號驗證失敗"}
      </Box>
    </Center>
  );
}
