import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react";
import stockList from "../../utils/stockList";

export default function AutoComplete(props) {
  const { onAdd } = props;
  const [text, setText] = useState("");

  const options = stockList.filter((x) => {
    if (!text) {
      return true;
    } else if (isPureNumber(text)) {
      return x[0].includes(text);
    } else {
      return x[1].includes(text);
    }
  });

  return (
    <>
      <Input placeholder="查詢" type="search" size="md" onChange={(e) => setText(e.target.value)} />
      <div style={{ height: "400px", overflowY: "auto", marginTop: "16px" }}>
        {options.map((item) => {
          return <ListItem key={item[0]} item={item} onAdd={onAdd} />;
        })}
      </div>
    </>
  );
}

function ListItem(props) {
  const { item, onAdd } = props;
  return (
    <Text
      onClick={() => {
        onAdd(item[0]);
      }}
      width="100%"
      cursor="pointer"
      _hover={{ backgroundColor: "gray.100" }}
      paddingY="1"
    >
      {item[0]} {item[1]}
    </Text>
  );
}

function isPureNumber(value) {
  return value.replace(/\D/g, "").length > 0;
}
