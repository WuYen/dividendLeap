import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Center, useToast } from "@chakra-ui/react";

import { useRouter, useAuth } from "../../hooks";
import { loginStatus } from "../../utilities/constants";
import AlertComponent from "../../components/commons/Alert";

export default function Login(props) {
  const auth = useAuth();
  const isLogin = useRef(auth.isLogin);

  return (
    <Box p="4" width="100%">
      {isLogin.current ? (
        <AlertComponent status="info" open={true} description={`Already login as ${auth.account}`} />
      ) : (
        <FormWrapper auth={auth}>{(formProps) => <Form {...formProps} />}</FormWrapper>
      )}
    </Box>
  );
}

const initialValues = {
  account: "",
  password: "",
};

const validationSchema = Yup.object({
  account: Yup.string().required("必填欄位"),
  password: Yup.string().required("必填欄位"),
});

function FormWrapper(props) {
  const { auth } = props;
  const [alertInfo, setAlertInfo] = useState({});
  const toast = useToast();
  const [, history] = useRouter();
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      auth.onLogin(values).then((response) => {
        if (response.result.code == loginStatus.Success.code) {
          toast({
            title: "Login Success!",
            status: "success",
            isClosable: true,
            duration: 1000,
          });
          history.push("/schedule");
        } else {
          //登入失敗
          actions.setSubmitting(false);
          setAlertInfo(response.result);
        }
      });
    },
    enableReinitialize: true,
    alertInfo: alertInfo,
    setAlertInfo,
  };
  return props.children(formProps);
}

function Form(props) {
  const { setAlertInfo, ...formProps } = props;
  return (
    <Formik {...formProps}>
      {({ handleSubmit, values, errors, ...rest }) => (
        <Center>
          <Box borderWidth="1px" rounded="lg" as="form" p={4} w="100%" maxWidth="1000px" onSubmit={handleSubmit}>
            <AlertComponent
              status="error"
              open={!!formProps.alertInfo.code}
              description={formProps.alertInfo.message}
              closeFunc={setAlertInfo}
            />
            <InputControl name="account" label="帳號" mb="2" inputProps={{ type: "text", autoComplete: "username" }} />
            <InputControl
              name="password"
              label="密碼"
              mb="2"
              inputProps={{
                type: "password",
                autoComplete: "current-password",
              }}
            />
            <ButtonGroup mt="2">
              <SubmitButton _focus={{ outline: "none" }}>登入</SubmitButton>
              <ResetButton
                isDisabled={false}
                _focus={{ outline: "none" }}
                onClick={() => {
                  rest.resetForm({ values: initialValues });
                  setAlertInfo({});
                }}
              >
                清除
              </ResetButton>
              {/* <Link href="./">忘記密碼</Link> */}
            </ButtonGroup>
          </Box>
        </Center>
      )}
    </Formik>
  );
}
