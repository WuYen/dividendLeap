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

const saveEdit = (id, onSetEditItem, refreshList) => (values, actions) => {
  const payload = JSON.stringify({ id, ...values });
  console.log("submit edit", payload);

  fetch(`${dataAPI}/schedule/update`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("saveEdit result", data);
      actions.setSubmitting(false);
      actions.resetForm({ values: initialValues });
      onSetEditItem(null);
      refreshList({});
    });
};

const saveAdd = (onSetEditItem, refreshList) => (values, actions) => {
  const payload = JSON.stringify(values);
  console.log("submit add", payload);

  fetch(`${dataAPI}/schedule/insert`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("saveAdd result", data);
      actions.setSubmitting(false);
      actions.resetForm({ values: initialValues });
      onSetEditItem(null);
      refreshList({});
    });
};

const getInitialValue = (isAdd, data) =>
  isAdd
    ? initialValues
    : {
        no: data.stockNo,
        name: data.stockName,
        date: data.date,
        value: data.cashDividen,
      };

function Form(props) {
  const { editItem, onSetEditItem, refreshList } = props;
  const isAdd = !editItem;
  const formProps = {
    initialValues: getInitialValue(isAdd, editItem),
    validationSchema,
    onSubmit: isAdd
      ? saveAdd(onSetEditItem, refreshList)
      : saveEdit(editItem._id, onSetEditItem, refreshList),
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

{
  /* 
            <ResetButton>Reset</ResetButton>
            <div
              onClick={() => {
                rest.resetForm({ values: initialValues });
                console.log(" Clear click prop", rest);
              }}
            >
              Clear
            </div> */
}
