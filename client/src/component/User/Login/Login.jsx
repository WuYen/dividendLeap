import React, { useState } from "react";
import { dataAPI } from "../../../utility/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup, Link } from "@chakra-ui/react";
import * as Yup from "yup";
import auth from "../../../utility/auth";
import { useHistory } from "react-router-dom";
import { loginstatus } from "../../../definition/status";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function Login(props) {
  return auth.isLogin ? (
    <div style={{ textAlign: "center" }}>
      Already login as {auth.context.account}
    </div>
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

  const url = `${dataAPI}/user/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  });
  const resInfo = await res.json();
  console.log("login result", resInfo);
  actions.setSubmitting(false);
  if (resInfo && resInfo.result.code == loginstatus.Success.code) {
    auth.token = resInfo.token;
  }
  return resInfo.token;
};

function Form(props) {
  let history = useHistory();

  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) =>
      callLogin(values, actions).then((res) => {
        console.log("ouSubmit result", res);
        history.push("/");
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
          {console.log(`rest`, rest, "value:", values)}
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
            <SubmitButton _focus={{ outline: "none" }}>登入</SubmitButton>
            <ResetButton
              isDisabled={false}
              _focus={{ outline: "none" }}
              onClick={() => {
                rest.resetForm({ values: initialValues });
              }}
            >
              清除
            </ResetButton>
            <Link href="./">忘記密碼</Link>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  );
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
