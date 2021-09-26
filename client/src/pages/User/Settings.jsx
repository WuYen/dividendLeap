import React from "react";
import { auth } from "../../utils";
import { Center, Box, Heading } from "@chakra-ui/layout";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  OrderedList,
  ListItem,
  Input,
  Text,
} from "@chakra-ui/react";
//TODO: Settings Page
export default function Settings(prop) {
  //TODO: need login page
  return auth.isLogin ? <Content /> : <></>;
}

function Content(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
      <Box borderWidth="1px" rounded="lg" p={4} w="100%" h="300px" maxWidth="1000px">
        <Heading as="h1" size="xl" isTruncated>
          設定
        </Heading>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td w="30%">設定一次性動態密碼</Td>
              <Td>
                <Button onClick={onOpen} colorScheme="blue">
                  啟用
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>設定一次性動態密碼</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <OrderedList>
                <ListItem>查閱信箱內一次性密碼設定信件</ListItem>
                <ListItem>請使用Google Authendicator掃描QRCode進行設定</ListItem>
                <ListItem>於此頁面輸入Google Authendicator一次性密碼</ListItem>
                <ListItem>設定完成</ListItem>
              </OrderedList>
              <Text p="3" fontWeight="bold">
                一次性密碼確認
              </Text>
              <Input placeholder="OTP" />
            </ModalBody>

            <ModalFooter>
              <Button mr={3}>Submit</Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
