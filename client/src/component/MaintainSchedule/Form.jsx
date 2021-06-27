import React from "react";
import { dataAPI } from "../../utility/config";
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
  date: Yup.string()
    .required("必填欄位")
    .matches(/^\d{8}$/, "日期格式錯誤 必須是8碼數字"),
  value: Yup.number().required("必填欄位"),
});

const saveData =
  (onSetEditItem, refreshList, id = "") =>
  (values, actions) => {
    const isAdd = id === "";
    const payload = JSON.stringify(values);
    console.log(`saveData isAdd:${isAdd}`, payload);

    const url = `${dataAPI}/schedule/${isAdd ? "insert" : "update"}`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("saveData result", data);
        actions.setSubmitting(false);
        actions.resetForm({ values: initialValues });
        onSetEditItem(null);
        refreshList({});
      });
  };

const getInitialValue = (data) => {
  if (data) {
    return {
      no: data.stockNo,
      name: data.stockName,
      date: data.date,
      value: data.cashDividen,
    };
  }
  return initialValues;
};

function Form(props) {
  const { editItem, onSetEditItem, refreshList } = props;
  const formProps = {
    initialValues: getInitialValue(editItem),
    validationSchema,
    onSubmit: saveData(onSetEditItem, refreshList, editItem?._id),
    enableReinitialize: true,
  };

  console.log("formProps", editItem, formProps);
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
          <InputControl name="name" label="股票名稱" mb="2" />
          <InputControl name="no" label="股票代號" mb="2" />
          <InputControl
            name="date"
            label="除息日"
            mb="2"
            inputProps={{ placeholder: "YYYYMMDD" }}
          />
          <NumberInputControl name="value" label="現金股利" mb="2" />

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
