import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import auth from "../utility/auth";
// import logo from "../logo.png";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontWeight="800"
            color={useColorModeValue("teal.600", "white")}
          >
            <Link
              as={RouterLink}
              _hover={{
                textDecoration: "none",
              }}
              to={{
                pathname: "/",
              }}
            >
              STOCK
              {/* <Image
                boxSize="30px"
                src={logo}
                fallbackSrc="https://via.placeholder.com/150"
              /> */}
            </Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={0}
        >
          {!auth.isLogin && (
            <Button
              as={"a"}
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              variant={"link"}
              href={"/login"}
              cursor="pointer"
            >
              登入
            </Button>
          )}
          {auth.isLogin && (
            <>
              <Text fontSize={"sm"} fontWeight={500} p={2}>
                {auth.context.account}
              </Text>
              <Button
                as={"a"}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                variant={"link"}
                onClick={() => {
                  auth.logout();
                  window.location.reload();
                }}
                cursor="pointer"
              >
                登出
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const activeLinkColor = useColorModeValue("teal.600", "teal.200");
  const linkHoverColor = useColorModeValue("teal.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = false;
        if ((navItem.auth == true && auth.isLogin) || !navItem.auth) {
          return (
            <Box key={navItem.label}>
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <PopoverTrigger>
                  <Link
                    p={2}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={isActive ? activeLinkColor : linkColor}
                    _hover={{
                      textDecoration: "underline",
                      color: linkHoverColor,
                    }}
                    _focus={{ outline: "none" }}
                    as={RouterLink}
                    to={{
                      pathname: navItem.href,
                    }}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>

                {navItem.children && (
                  <PopoverContent
                    border={0}
                    boxShadow={"xl"}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          );
        }
        return null;
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      as={RouterLink}
      to={{
        pathname: href,
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) =>
        (navItem.auth == true && auth.isLogin) || !navItem.auth ? (
          <MobileNavItem key={navItem.label} {...navItem} />
        ) : null
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={RouterLink}
                to={{
                  pathname: child.href,
                }}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "除權息列表",
    href: "/",
  },
  // {
  //   label: "管理列表",
  //   href: "/schedule/maintain",
  //   auth: true,
  // },
  // {
  //   label: "我的清單",
  //   href: "/my/stock",
  //   auth: true,
  // },
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
];

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
