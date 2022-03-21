import React from "react";
import { Box, Grid, Text, IconButton } from "@chakra-ui/react";
import { stockList } from "../../utilities";
import { MinusIcon } from "@chakra-ui/icons";

export default function MyListItem(props) {
  const { item, active, onSelect, onRemove, kd, enableDelete } = props;
  const info = stockList.find((x) => x[0] == item.stockNo);
  if (!info) {
    return null;
  } else {
    const name = `${item.stockNo} ${info[1]}`;
    return (
      <Grid
        templateColumns="1fr auto"
        gap={2}
        alignItems="center"
        _hover={{ backgroundColor: "gray.100" }}
        px="2"
        borderBottom={"1px dashed #CBD5E0"}
      >
        <Box
          color={active ? "teal.500" : "grey.500"}
          onClick={() => {
            onSelect(item.stockNo);
          }}
          width="100%"
          cursor="pointer"
          paddingY="1"
        >
          <Text>{name}</Text>
          <Box display="flex" justifyContent="space-between">
            {kd && <Box style={{ color: kd.k > kd.d ? "red" : "balck", width: "50px" }}>{`K:${kd.k}`}</Box>}
            {kd && <Box style={{ color: kd.d > kd.k ? "red" : "balck", width: "50px" }}>{`D:${kd.d}`}</Box>}
          </Box>
        </Box>
        {enableDelete && (
          <IconButton
            colorScheme="teal"
            _focus={{ outline: "none" }}
            rounded="100"
            onClick={() => {
              window.confirm("確認刪除: " + name) == true && onRemove(item._id);
            }}
            size="xs"
            variant="outline"
            icon={<MinusIcon />}
          />
        )}
      </Grid>
    );
  }
}
