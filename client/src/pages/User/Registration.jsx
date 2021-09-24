import React, { useState } from "react";
import { dataAPI } from "../../utils/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Center } from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import AlertComponent from "../../components//Alert";
import { loginStatus } from "../../constants/status";

export default function Registration(prop) {
  return <Form />;
}

const initialValues = {
  account: "",
  email: "",
  password: "",
  password_cf: "",
};

const validationSchema = Yup.object({
  account: Yup.string().required("必填欄位"),
  email: Yup.string().required("必填欄位").email("信箱格式不正確"),
  password: Yup.string().required("必填欄位"),
  password_cf: Yup.string()
    .required("必填欄位")
    .oneOf([Yup.ref("password")], "密碼不相同"),
});

const callRegistration = async (payload, actions) => {
  console.log(payload);
  const url = `${dataAPI}/user/registration`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const resInfo = await res.json();
  console.log("login result", resInfo);
  actions.setSubmitting(false);

  return resInfo;
};

function Form(props) {
  let history = useHistory();
  const [alertInfo, setalertInfo] = useState({});
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      callRegistration(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        setalertInfo(res.result);
        if (res.result.code == loginStatus.Success.code) history.push("/");
      }),
    enableReinitialize: true,
    alertInfo: alertInfo,
  };

  return (
    <Box p="4" width="100%">
      <Formik {...formProps}>
        {({ handleSubmit, values, errors, ...rest }) => (
          <Center>
            <Box borderWidth="1px" rounded="lg" as="form" w="100%" maxWidth="1000px" p={4} onSubmit={handleSubmit}>
              <AlertComponent
                status="error"
                open={!!formProps.alertInfo.code}
                description={formProps.alertInfo.message}
                closeFunc={setalertInfo}
              />
              <InputControl
                name="email"
                label="信箱"
                mb="2"
                inputProps={{
                  type: "email",
                }}
              />
              <InputControl
                name="account"
                label="帳號"
                mb="2"
                inputProps={{
                  type: "username",
                }}
              />
              <InputControl
                name="password"
                label="密碼"
                mb="2"
                inputProps={{
                  type: "password",
                  autoComplete: "new-password",
                }}
              />
              <InputControl
                name="password_cf"
                label="確認密碼"
                mb="2"
                inputProps={{
                  type: "password",
                  autoComplete: "new-password",
                }}
              />
              <ButtonGroup mt="2">
                <SubmitButton _focus={{ outline: "none" }}>註冊</SubmitButton>
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
            </Box>
          </Center>
        )}
      </Formik>
    </Box>
  );
}
