import React, { useState } from "react";
import { dataAPI } from "../../../utility/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Link, Center,Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { string } from "yup/lib/locale";

export default function Registration(prop) {
  return <Form />;
}

const initialValues = {
  account: "",
  name: "",
  email: "",
  password: "",
  password_cf: "",
};

const validationSchema = Yup.object({
  account: Yup.string().required("必填欄位"),
  name: Yup.string().required("必填欄位"),
  email: Yup.string().required("必填欄位").email("信箱格式不正確"),
  password: Yup.string().required("必填欄位"),
  password_cf: Yup.string()
    .required("必填欄位")
    .oneOf([Yup.ref("password")], "密碼不相同"),
});

const callRegistration = async (values, actions) => {
  const payload = JSON.stringify(values);
  console.log(payload);
  const url = `${dataAPI}/user/registration`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  });
  const resInfo = await res.json();
  console.log("login result", resInfo);
  actions.setSubmitting(false);

  return resInfo.token;
};

function Form(props) {
  let history = useHistory();

  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      callRegistration(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        history.push("/");
      }),
    enableReinitialize: true,
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, values, errors, ...rest }) => (
        <Center>
          <Box
          borderWidth="1px"
          rounded="lg"
          as="form"
          w="100%"
          maxWidth="1000px"
          p={4}
          onSubmit={handleSubmit}
        >
          {console.log(`rest`, rest, "value:", values)}
          <InputControl name="account" label="帳號" mb="2" />
          <InputControl name="name" label="名稱" mb="2" />
          <InputControl name="email" label="信箱" mb="2" />
          <InputControl
            name="password"
            label="密碼"
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
  );
}
