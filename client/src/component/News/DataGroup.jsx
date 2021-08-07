import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { formatDate } from "../../utility/formatHelper";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default React.memo(DataGroup);
function DataGroup(props) {
  const { fetchData, date } = props;
  const [list, setList] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    fetchData(date).then(({ success, data }) => {
      isLoaded.current = true;
      success ? setList(data) : console.error("fetchData fail");
    });
  }, []);

  if (!isLoaded.current) {
    return null;
  }

  return (
    <Box>
      <h5>{formatDate(date)}</h5>
      {list.length == 0 ? (
        <Box>
          No Record
          {/* <Image
            objectFit="cover"
            //src="https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif"
            //src="https://cdn.dribbble.com/users/3925584/screenshots/15796673/media/09e702c5c59ea914be62962d0180e1ae.gif"
            alt="Empty"
          /> */}
        </Box>
      ) : (
        <List spacing={3}>
          {list.map(({ link, title }, index) => {
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
    </Box>
  );
}
