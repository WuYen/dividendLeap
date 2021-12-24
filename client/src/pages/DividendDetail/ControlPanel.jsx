import React from "react";
import { Button } from "@chakra-ui/react";
import BackButton from "./BackButton";

export default function ControlPanel(props) {
  const { variant, setOldView } = props;
  return (
    <>
      <BackButton variant={variant} />
      <Button
        loadingText="切換顯示"
        colorScheme="teal"
        variant="outline"
        size="sm"
        spinnerPlacement="end"
        _focus={{ outline: "none" }}
        onClick={() => {
          setOldView((x) => !x);
        }}
      >
        切換顯示
      </Button>
    </>
  );
}
