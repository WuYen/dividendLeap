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
        <Center m="4">
          <Heading as="h1" size="lg" isTruncated>
            設定
          </Heading>
        </Center>
        <Box>
          <Heading as="h2" size="md" isTruncated>
            安全
          </Heading>
        </Box>

        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td w="50%">密碼變更</Td>
              <Td>
                <Button onClick={onOpen} colorScheme="blue">
                  更改
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>設定一次性動態密碼</Td>
              <Td>
                <Button onClick={onOpen} colorScheme="blue">
                  啟用
                </Button>
                <Text> 啟用後將發送信件</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <OTP isOpen={isOpen} onClose={onClose} />
      </Box>
    </Center>
  );
}

function ModalDialog(props) {
  const { isOpen, onClose, Header, hasSubmitBtn } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{Header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          {hasSubmitBtn && (
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              確認
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function ChangePW(props) {
  return <></>;
}

function OTP(props) {
  return (
    <ModalDialog Header="設定一次性動態密碼" hasSubmitBtn="true" {...props}>
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
    </ModalDialog>
  );
}
// function ModalDialog(props) {
//   const { isOpen, onClose, Header, body } = props;
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>設定一次性動態密碼</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <OrderedList>
//             <ListItem>查閱信箱內一次性密碼設定信件</ListItem>
//             <ListItem>請使用Google Authendicator掃描QRCode進行設定</ListItem>
//             <ListItem>於此頁面輸入Google Authendicator一次性密碼</ListItem>
//             <ListItem>設定完成</ListItem>
//           </OrderedList>
//           <Text p="3" fontWeight="bold">
//             一次性密碼確認
//           </Text>
//           <Input placeholder="OTP" />
//         </ModalBody>

//         <ModalFooter>
//           <Button mr={3}>Submit</Button>
//           <Button colorScheme="blue" mr={3} onClick={onClose}>
//             Close
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }
