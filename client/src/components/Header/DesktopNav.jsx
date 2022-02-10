import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../../utils";

export default function DesktopNav(props) {
  const { navItems } = props;
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const activeLinkColor = useColorModeValue("teal.600", "teal.200");
  const linkHoverColor = useColorModeValue("teal.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  return (
    <Stack direction={"row"} spacing={4}>
      {navItems.map((navItem) => {
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
}

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
          <Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
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
