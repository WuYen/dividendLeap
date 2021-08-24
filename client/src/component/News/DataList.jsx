import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Link,
  Text,
  Fade,
  Stack,
  Skeleton,
  Center,
} from "@chakra-ui/react";
import { formatDate } from "../../utility/formatHelper";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import MoreButton from "./MoreButton";
import api from "../../utility/api";

export function Container(props) {
  const { date } = props;
  const [list, setList] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    api
      .get(`/news/${date}`)
      .then((data) => {
        console.log("fetchData result", data);
        return data;
      })
      .then(({ success, data }) => {
        isLoaded.current = true;
        success ? setList(data) : console.error("fetchData fail");
      });
  }, [date]);

  if (!isLoaded.current) {
    return props.children[props.loading];
  } else {
    return React.cloneElement(props.children[props.list], { date, list });
  }
}

const showLine = 8;

export const DataList = React.memo(function DataList(props) {
  const { list = [], date } = props;
  const [more, setMore] = useState(false);
  const needShowMore = list.length > showLine;

  return (
    <Fade in={true}>
      <Box>
        {date && <h5>{formatDate(date)}</h5>}
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

{
  /* <Image
            objectFit="cover"
            //src="https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif"
            //src="https://cdn.dribbble.com/users/3925584/screenshots/15796673/media/09e702c5c59ea914be62962d0180e1ae.gif"
            alt="Empty"
          /> */
}
