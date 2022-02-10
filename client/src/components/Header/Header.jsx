import React from "react";
import { Box, Flex, Stack, Collapse, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav, { HamburgerButton } from "./MobileNav";
import MemberNav from "./MemberNav";
import BrandLogo from "./BrandLogo";
import useAuth from "../../hooks/useAuth";

const NAV_ITEMS = [
  {
    label: "列表",
    href: "/schedule",
  },

  {
    label: "清單",
    href: "/my/stock",
    auth: true,
  },
  {
    label: "新聞",
    href: "/news",
    auth: false,
  },
  {
    label: "Tools",
    href: "/tool",
    auth: true,
  },
  // { 暫時不做
  //   label: "Real Time",
  //   href: "/realTime",
  //   auth: true,
  // },
  // {
  //   label: "歷史列表",
  //   href: "/schedule/history",
  // },
  // {
  //   label: "編輯列表",
  //   href: "/schedule/maintain",
  //   auth: false,
  // },
];

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const auth = useAuth();
  return (
    <Box>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        borderBottom={1}
        borderStyle={"solid"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <HamburgerButton onToggle={onToggle} isOpen={isOpen} />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <BrandLogo />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav navItems={NAV_ITEMS} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={0}>
          <MemberNav auth={auth} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

//nested link sample
//{
//   label: "Inspiration",
//   children: [
//     {
//       label: "Explore Design Work",
//       subLabel: "Trending Design to inspire you",
//       href: "#",
//     },
//     {
//       label: "New & Noteworthy",
//       subLabel: "Up-and-coming Designers",
//       href: "#",
//     },
//   ],
// },
// {
//   label: "除權息列表",
//   children: [
//     {
//       label: "預告列表",
//       href: "/schedule",
//     },
//     {
//       label: "歷史列表",
//       href: "/schedule?history=true",
//     },
//   ],
// },
