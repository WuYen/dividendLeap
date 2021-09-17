import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Link, Center } from "@chakra-ui/react";

import { auth, api } from "../../utils";
import { loginstatus } from "../../constants/status";
import AlertComponent from "../../components//Alert";

export default function Login(props) {
  //TODO: toggle
  const [state, setstate] = useState({});
  return auth.isLogin ? (
    <AlertComponent state="info" show={true} description={`Already login as ${auth.context.account}`} />
  ) : (
    <Form />
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

const callLogin = async (values, actions) => {
  const payload = JSON.stringify(values);
  const resInfo = await api.post(`/user/login`, payload);
  actions.setSubmitting(false);
  if (resInfo && resInfo.result.code == loginstatus.Success.code) {
    auth.token = resInfo.token;
  }
  return resInfo;
};

function Form(props) {
  let history = useHistory();
  const [alertInfo, setalertInfo] = useState({});
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      callLogin(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        setalertInfo(res.result);
        if (res.result.code == loginstatus.Success.code) history.push("/");
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
              closeFunc={setalertInfo}
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
                  setalertInfo({});
                }}
              >
                清除
              </ResetButton>
              <Link href="./">忘記密碼</Link>
            </ButtonGroup>
          </Box>
        </Center>
      )}
    </Formik>
  );
}
