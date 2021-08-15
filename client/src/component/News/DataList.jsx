import React, { useEffect, useRef, useState } from "react";
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

const showLine = 8;

export default React.memo(DataList);
function DataList(props) {
  const { fetchData, date } = props;
  const [list, setList] = useState([]);
  const [more, setMore] = useState(false);
  const isLoaded = useRef(false);
  const needShowMore = list.length > showLine;

  useEffect(() => {
    fetchData(date).then(({ success, data }) => {
      isLoaded.current = true;
      success ? setList(data) : console.error("fetchData fail");
    });
  }, []);

  if (!isLoaded.current) {
    return (
      <Stack spacing={3}>
        <Skeleton height="24px" width="100px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
      </Stack>
    );
  }

  return (
    <Fade in={true}>
      <Box>
        <h5>{formatDate(date)}</h5>
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
                    {/* <Tooltip label={title} fontSize="md"> */}
                    <Text isTruncated>
                      <ListIcon as={ExternalLinkIcon} color="teal.500" />
                      {title}
                    </Text>
                    {/* </Tooltip> */}
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
}

{
  /* <Image
            objectFit="cover"
            //src="https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif"
            //src="https://cdn.dribbble.com/users/3925584/screenshots/15796673/media/09e702c5c59ea914be62962d0180e1ae.gif"
            alt="Empty"
          /> */
}
