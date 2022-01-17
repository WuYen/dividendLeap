import React, { useState, useEffect } from "react";
import { auth } from "../../utils";
import { UserAPI } from "../../utils/api";
import { Center, Box, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Tr, Td, Button, OrderedList, ListItem, Input, Text, ButtonGroup } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import useModalDialog from "../../hooks/useModalDialog";
import { useSelector } from "react-redux";
//TODO: Settings Page
export default function Settings(prop) {
  //TODO: need login page
  return auth.isLogin ? <Content /> : <></>;
}

function Content(props) {
  const initialValues = {
    password: "",
    password_cf: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string(),
    password_cf: Yup.string().oneOf([Yup.ref("password")], "密碼不相同"),
  });

  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) => callUpdateUser(values, actions).then((res) => {}),
    enableReinitialize: true,
  };

  const { isOpen, onOpen } = useSelector(({ modalDialog }) => modalDialog);
  function callUpdateUser() {}
  return (
    <>
      <Formik {...formProps}>
        {({ handleSubmit, values, errors, ...rest }) => (
          <Center>
            <Box borderWidth="1px" rounded="lg" p={4} w="100%" minHeight="300px" maxWidth="1000px">
              <Center m="4">
                <Heading as="h1" size="lg" isTruncated>
                  設定
                </Heading>
              </Center>
              <Heading as="h2" size="md" p="2" isTruncated>
                個人化
              </Heading>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td w="30%">圖片</Td>
                    <Td>
                      <Input placeholder="File" />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Heading as="h2" size="md" p="2" isTruncated>
                安全
              </Heading>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td w="30%">密碼變更</Td>
                    <Td>
                      <InputControl
                        name="password_old"
                        label="舊密碼"
                        mb="2"
                        inputProps={{
                          type: "password",
                        }}
                      />
                      <InputControl
                        name="password_new"
                        label="更新密碼"
                        mb="2"
                        inputProps={{
                          type: "password",
                        }}
                      />
                      <InputControl
                        name="password_cf"
                        label="確認密碼"
                        mb="2"
                        inputProps={{
                          type: "password",
                        }}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>設定一次性動態密碼</Td>
                    <Td>
                      <Button onClick={onOpen} colorScheme="blue">
                        啟用
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Center>
                <ButtonGroup mt="2" p="2">
                  <SubmitButton _focus={{ outline: "none" }}>更新</SubmitButton>
                  <ResetButton
                    isDisabled={false}
                    _focus={{ outline: "none" }}
                    onClick={() => {
                      rest.resetForm({ values: initialValues });
                    }}
                  >
                    清除
                  </ResetButton>
                </ButtonGroup>
              </Center>
            </Box>
          </Center>
        )}
      </Formik>
      <OTPContainer />
    </>
  );
}

function OTPContainer(props) {
  //#region define
  const { isOpen } = props;
  const [qrCode, setQrCode] = useState();
  const handleSubmit = async (values, actions) => {
    const payload = JSON.stringify({ account: auth.context.account, token: values });
    const { result } = await UserAPI.confirmOTP(payload);
    if (result) {
      // useToast()({
      //   title: "啟動成功",
      //   status: "success",
      //   duration: 3000,
      // });
    }
  };
  const getQrCode = async () => {
    const payload = JSON.stringify({ account: auth.context.account, token: null });
    let res = await UserAPI.generateOTP(payload);
    res && setQrCode(res.result);
  };
  //#endregion
  useEffect(() => {
    !qrCode && getQrCode();
  }, [qrCode]);

  const { onOpen } = useModalDialog({
    header: "設定一次性動態密碼",
    Body: () => (
      <>
        <OrderedList>
          <Center>
            <img src={qrCode} />
          </Center>
          <ListItem>請使用Google Authendicator掃描QRCode進行設定</ListItem>
          <ListItem>於下方輸入一次性密碼進行確認</ListItem>
          <ListItem>設定完成</ListItem>
        </OrderedList>
        <Text p="3" fontWeight="bold">
          一次性密碼確認
        </Text>
        <InputControl
          name="token"
          mb="2"
          placeholder="OTP"
          inputProps={{
            type: "token",
          }}
        />
      </>
    ),
    Footer: () => (
      <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
        確認
      </Button>
    ),
  });

  useEffect(() => {
    console.log("isOpen", isOpen);
    isOpen && onOpen();
  }, [isOpen]);
  return <></>;
}
