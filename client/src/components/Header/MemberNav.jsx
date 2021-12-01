import React from "react";
import { Box, Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function MemberNav(props) {
  const { auth } = props;
  return auth.isLogin ? (
    <Menu isLazy>
      <MenuButton>
        <MemberAvatar account={auth.account} />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={RouterLink}
          to={{
            pathname: "/user/settings",
          }}
        >
          設定
        </MenuItem>
        <MenuItem onClick={auth.onLogout}>登出</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <>
      <LinkButton path="/user/login" label="登入" />
      <LinkButton path="/user/registration" label="註冊" />
    </>
  );
}

function MemberAvatar(props) {
  const { account } = props;
  return (
    <Flex p={2}>
      <Avatar size="xs" src={`https://avatars.dicebear.com/api/bottts/${account}.svg`} />
      <Box ml="3">
        <Text fontWeight="bold">{account}</Text>
      </Box>
    </Flex>
  );
}

function LinkButton(props) {
  const { path, label } = props;
  return (
    <Button
      as={RouterLink}
      to={{ pathname: path }}
      _focus={{ outline: "none" }}
      p={2}
      fontSize={"sm"}
      fontWeight={500}
      variant={"link"}
      cursor="pointer"
    >
      {label}
    </Button>
  );
}
