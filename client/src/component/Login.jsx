import React, { useState } from "react";
import { dataAPI } from "../utility/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup } from "@chakra-ui/react";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

const initialValues = {
  account: "",
  password: "",
};

const validationSchema = Yup.object({
  account: Yup.string().required("必填欄位"),
  password: Yup.string().required("必填欄位"),
});

const saveData = (values, actions) => {
  const payload = JSON.stringify(values);

  const url = `${dataAPI}/user/login`;
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("login result", res);
      actions.setSubmitting(false);
      if (res.success) {
        localStorage.setItem("AUTH_TOKEN", res.token);
        var decoded = jwt_decode(res.token);
        window.JWT = { context: decoded, token: res.token };
      }
      return res.token;
    });
};

function Form(props) {
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      saveData(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        props.render({});
      }),
    enableReinitialize: true,
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, values, errors, ...rest }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          as="form"
          p={4}
          onSubmit={handleSubmit}
        >
          <InputControl name="account" label="帳號" mb="2" />
          <InputControl
            name="password"
            label="密碼"
            mb="2"
            inputProps={{ type: "password" }}
          />

          <ButtonGroup mt="2">
            <SubmitButton _focus={{ outline: "none" }}>Submit</SubmitButton>
            <ResetButton
              isDisabled={false}
              _focus={{ outline: "none" }}
              onClick={() => {
                rest.resetForm({ values: initialValues });
              }}
            >
              Clear
            </ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  );
}

function Login(props) {
  const [, render] = useState();
  const jwt = localStorage.getItem("AUTH_TOKEN");

  if (jwt) {
    return (
      <div>
        is login, {jwt}
        <div
          onClick={() => {
            localStorage.removeItem("AUTH_TOKEN");
          }}
        >
          log out
        </div>
      </div>
    );
  } else {
    return <Form render={render} />;
  }
}

export default Login;
