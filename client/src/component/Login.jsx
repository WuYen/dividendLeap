import React, { useState } from "react";
import { dataAPI } from "../utility/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup } from "@chakra-ui/react";
import * as Yup from "yup";
import auth from "../utility/auth";

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
        // auth.setToken(res.token);
        auth.token = res.token;
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
          <InputControl
            name="account"
            label="帳號"
            mb="2"
            inputProps={{ type: "text", autoComplete: "username" }}
          />
          <InputControl
            name="password"
            label="密碼"
            mb="2"
            inputProps={{ type: "password", autoComplete: "current-password" }}
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

  if (auth.isLogin) {
    return (
      <div>
        is login, {auth.context.account}
        <TestAPI />
        <div
          onClick={() => {
            auth.token = null;
            render({});
          }}
        >
          log out
        </div>
      </div>
    );
  } else {
    return (
      <>
        <TestAPI />
        <Form render={render} />
      </>
    );
  }
}

function TestAPI(props) {
  const [state, setState] = useState();
  //client-side code
  const url = `${dataAPI}/user/validate`;

  return (
    <div>
      state: {state}
      <br />
      <button
        onClick={() => {
          console.log("auth token:", auth.token);
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          })
            .then(function (response) {
              console.log(response);
              return response.json();
            })
            .then(function (data) {
              console.log("response", data);
              setState(data.message);
            })
            .catch((error) => {
              console.log("error", error);
              setState("invalid");
            });
        }}
      >
        Call API
      </button>
    </div>
  );
}

export default Login;
