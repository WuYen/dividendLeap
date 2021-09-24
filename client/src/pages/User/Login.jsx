import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Center } from "@chakra-ui/react";

import { auth, api } from "../../utils";
import { loginStatus } from "../../constants/status";
import AlertComponent from "../../components//Alert";

export default function Login(props) {
  //TODO: toggle
  const [state, setstate] = useState({});
  return (
    <Box p="4" width="100%">
      {auth.isLogin ? (
        <AlertComponent status="info" open={true} description={`Already login as ${auth.context.account}`} />
      ) : (
        <Form />
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

const handleLogin = async (values, actions) => {
  const payload = JSON.stringify(values);
  const response = await api.post(`/user/login`, payload);
  actions.setSubmitting(false);
  if (response && response.result.code == loginStatus.Success.code) {
    auth.token = response.token;
  }
  return response;
};

function Form(props) {
  const [alertInfo, setAlertInfo] = useState({});
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      handleLogin(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        res.result.code == loginStatus.Success.code && (window.location = "/");
        setAlertInfo(res.result);
      }),
    enableReinitialize: true,
    alertInfo: alertInfo,
  };

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
