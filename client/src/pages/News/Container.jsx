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
import { toDateString } from "../../utils/formatHelper";
import auth from "../../utils/auth";

import MoreButton from "./MoreButton";
import DataList from "./DataList";
import KeyWord from "../../components/KeyWord";

const keyWords = ["現金股利", "增資", "合併", "訂單", "設廠", "利多消息"];

export default function News(props) {
  const [search, setSearch] = useState({
    keyWord: "現金股利",
    queryDate: getLastNDay(4),
  });
  const { keyWord, queryDate } = search;
  const [over768px] = useMediaQuery("(min-width: 768px)");
  const isCustomSearch = !keyWords.includes(keyWord);

  const loadMore = useCallback(() => {
    setSearch((x) => {
      return { ...x, queryDate: getLastNDay(x.queryDate.length + 4) };
    });
  }, [setSearch]);

  const setKeyWord = useCallback(
    (text) => {
      setSearch({ keyWord: text, queryDate: getLastNDay(4) });
    },
    [setSearch]
  );

  return (
    <Box p="4" width="100%">
      <Flex>
        <Box>
          {keyWords.map((text) => {
            return (
              <KeyWord
                key={text}
                text={text}
                active={text == keyWord}
                onClick={() => {
                  setKeyWord(text);
                }}
              />
            );
          })}
        </Box>
        <Spacer />
        <Box>{auth.isLogin && <Search setKeyWord={setKeyWord} />}</Box>
      </Flex>

      <SimpleGrid columns={over768px ? 4 : 1} spacing={10} paddingTop={"12px"}>
        {isCustomSearch ? (
          <DataList.Container key={keyWord} keyWord={keyWord} search={true} loading={0} list={1}>
            <DataList.Loading />
            <DataList.List />
          </DataList.Container>
        ) : (
          queryDate.map((d, i) => {
            return (
              <DataList.Container key={`${keyWord}-${d}`} keyWord={keyWord} date={d} loading={0} list={1}>
                <DataList.Loading />
                <DataList.List />
              </DataList.Container>
            );
          })
        )}
      </SimpleGrid>
      <Divider paddingTop="4" />
      <Center paddingTop="4">
        {!isCustomSearch && <MoreButton width="100%" showMore={true} onClick={loadMore} />}
      </Center>
    </Box>
  );
}

function Search(props) {
  const { setKeyWord } = props;
  const inputRef = useRef();

  const handleSetKeyWord = () => {
    inputRef.current.value && setKeyWord(inputRef.current.value);
  };

  return (
    <InputGroup size="md">
      <Input
        placeholder="關鍵字"
        ref={inputRef}
        onKeyUp={(e) => {
          e.which === 13 && handleSetKeyWord();
        }}
      />
      <InputRightElement width="4.5rem" paddingRight="6px" justifyContent="flex-end">
        <IconButton
          onClick={handleSetKeyWord}
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
