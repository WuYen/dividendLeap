import React from "react";
// import { formatDate } from "../utility/formatHelper";
import { dataAPI } from "../utility/config";
import { Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  ResetButton,
  SubmitButton,
} from "formik-chakra-ui";
import { Box, ButtonGroup } from "@chakra-ui/react";
import * as Yup from "yup";

const initialValues = {
  no: "",
  name: "",
  date: "",
  value: 0,
};

const validationSchema = Yup.object({
  no: Yup.string()
    .required("必填欄位")
    .matches(
      /^[0-9][0-9]*[A-Za-z]{0,1}$/,
      "代號錯誤 只能是數字開頭 零個或是一個英文結尾"
    ),
  name: Yup.string().required("必填欄位"),
  date: Yup.string().required("必填欄位"),
  value: Yup.number().required("必填欄位"),
});

function InsertForm(props) {
  const onSubmit = (values, actions) => {
    console.log("submit", values);
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1200);
    // fetch(`${dataAPI}/stock/insert`, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     no: "12345",
    //     name: "test",
    //     date: "20210701", //除息日期 20190701
    //     value: 0.5, //現金股利0.4
    //   }), // must match 'Content-Type' header
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("data", data);
    //   }); // 輸出成 json
  };

  const formProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, values, errors }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit}
        >
          <InputControl name="no" label="股票代號" mb="2" />
          <InputControl name="name" label="股票名稱" mb="2" />
          <InputControl
            name="date"
            label="除息日"
            mb="2"
            inputProps={{ placeholder: "yyyyMMdd" }}
          />
          <NumberInputControl name="value" label="現金股利" mb="2" />

          <ButtonGroup mt="2">
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  );
}

export default InsertForm;
