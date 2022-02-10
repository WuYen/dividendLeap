import React, { useState, useRef, useEffect } from "react";
import { Box, List, ListItem, ListIcon, Link, Text, Fade, Stack, Skeleton, Center } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import MoreButton from "./MoreButton";
import { useSocket } from "../../hooks";
import { auth, formatHelper, NewsAPI } from "../../utils";

export function Container(props) {
  const { date, keyWord, search = false } = props;
  const [list, setList] = useState([]);
  const socket = useSocket();
  const isLoaded = useRef(false);
  useEffect(() => {
    if (date) {
      NewsAPI.getByWords(date, keyWord)
        .then((data) => {
          console.log("fetchData result", data);
          return data;
        })
        .then(({ success, data }) => {
          isLoaded.current = true;
          success ? setList(data) : console.error("fetchData fail");
        });
    }
  }, [date, keyWord]);

  useEffect(() => {
    if (search && keyWord && socket && auth.isLogin) {
      socket.emit("search", keyWord, (response) => {
        console.log(response); // ok
        isLoaded.current = true;
        setList(response);
      });
    }
  }, [search, socket]);

  if (!isLoaded.current) {
    return props.children[props.loading];
  } else {
    return React.cloneElement(props.children[props.list], {
      date,
      keyWord,
      list,
    });
  }
}

const showLine = 8;

export const DataList = React.memo(function DataList(props) {
  const { list = [], date, keyWord = "" } = props;
  const [more, setMore] = useState(false);
  const needShowMore = list.length > showLine;

  return (
    <Fade in={true}>
      <Box>
        <h5> {date ? formatHelper.formatDate(date) : keyWord}</h5>
        {list.length == 0 ? (
          <Box>No Record</Box>
        ) : (
          <List spacing={3}>
            {list.map(({ link, title }, index) => {
              if (index >= showLine && !more) {
                return null;
              }
              return (
                <ListItem key={index}>
                  <Link href={link} isExternal>
                    <Text isTruncated>
                      <ListIcon as={ExternalLinkIcon} color="teal.500" />
                      {title}
                    </Text>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        )}
        {needShowMore && (
          <Center paddingTop="0">
            <MoreButton
              showMore={!more}
              showText={false}
              width="100%"
              onClick={() => {
                setMore((x) => !x);
              }}
            />
          </Center>
        )}
      </Box>
    </Fade>
  );
});

export function Loading(params) {
  return (
    <Fade in={true}>
      <Stack spacing={3}>
        <Skeleton height="24px" width="100px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
      </Stack>
    </Fade>
  );
}

export default { Loading, List: DataList, Container };
