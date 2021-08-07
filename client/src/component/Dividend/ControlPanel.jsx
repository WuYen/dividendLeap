import React from "react";
import { Switch, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

import auth from "../../utility/auth";

export default function ControlPanel(props) {
  const { filter, toggleFilter } = props;
  return (
    <FormControl display="flex" alignItems="center" p={4}>
      <Switch
        id="filter"
        colorScheme="teal"
        isChecked={filter}
        onChange={toggleFilter}
      />
      <FormLabel htmlFor="filter" mb="0">
        殖利率大於 5%
      </FormLabel>

      {auth.isLogin && (
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          rightIcon={<RepeatIcon />}
          _focus={{ outline: "none" }}
          onClick={() => {
            //call data api
          }}
        >
          刷新列表
        </Button>
      )}
    </FormControl>
  );
}
