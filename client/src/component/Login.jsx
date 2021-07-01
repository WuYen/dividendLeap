import React from "react";
import { dataAPI } from "../utility/config";
import { Formik } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import { Box, ButtonGroup } from "@chakra-ui/react";
import * as Yup from "yup";

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
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("login result", data);
      actions.setSubmitting(false);
      //TODO save JWT
    });
};

function Form(props) {
  const formProps = {
    initialValues: initialValues,
    validationSchema,
    onSubmit: saveData,
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
          <InputControl name="password" label="密碼" mb="2" />

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

export default Form;
