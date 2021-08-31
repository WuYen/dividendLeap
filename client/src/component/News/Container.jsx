import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Center,
  useMediaQuery,
  Divider,
  IconButton,
  Flex,
  Spacer,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { toDateString } from "../../utility/formatHelper";
import auth from "../../utility/auth";

import MoreButton from "./MoreButton";
import DataList from "./DataList";
import KeyWord from "./KeyWord";

export default function News(props) {
  const [queryDate, setQueryDate] = useState(getLastNDay(4));
  const [keyWord, setKeyWord] = useState("");
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const loadMore = useCallback(() => {
    setQueryDate((x) => getLastNDay(x.length + 4));
  }, [setQueryDate]);

  return (
    <Box p="4" width="100%">
      <Flex>
        <Box paddingRight="8px">
          <KeyWord
            onClick={() => {
              setKeyWord("");
            }}
            active={keyWord == ""}
            text="現金股利"
          />
        </Box>
        <Spacer />
        <Box>{auth.isLogin && <Search setKeyWord={setKeyWord} />}</Box>
      </Flex>

      <SimpleGrid columns={over768px ? 4 : 1} spacing={10} paddingTop={"12px"}>
        {keyWord ? (
          <DataList.Container
            key={keyWord}
            keyWord={keyWord}
            loading={0}
            list={1}
          >
            <DataList.Loading />
            <DataList.List />
          </DataList.Container>
        ) : (
          queryDate.map((d, i) => {
            return (
              <DataList.Container key={d} date={d} loading={0} list={1}>
                <DataList.Loading />
                <DataList.List />
              </DataList.Container>
            );
          })
        )}
      </SimpleGrid>
      <Divider paddingTop="4" />
      <Center paddingTop="4">
        {!keyWord && <MoreButton showMore={true} onClick={loadMore} />}
      </Center>
    </Box>
  );
}

function Search(props) {
  const { setKeyWord } = props;
  const inputRef = useRef();

  return (
    <InputGroup size="md">
      <Input placeholder="關鍵字" ref={inputRef} />
      <InputRightElement
        width="4.5rem"
        paddingRight="6px"
        justifyContent="flex-end"
      >
        <IconButton
          onClick={() => {
            console.log("search click");
            setKeyWord(inputRef.current.value);
          }}
          size="sm"
          aria-label="Search"
          icon={<SearchIcon />}
          h="1.75rem"
          _focus={{ outline: "none" }}
        />
      </InputRightElement>
    </InputGroup>
  );
}

function getLastNDay(n) {
  const today = new Date();

  let result = [toDateString(today)];
  for (let i = 1; i < n; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    result.push(toDateString(d));
  }
  return result;
}
