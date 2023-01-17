import { Field, ErrorMessage } from "formik";
import React from "react";
import { TextField } from "@mui/material";
import ErrorMsg from "./Error";
const input = (props) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="form-control"
    >
      <Field name={props.name}>
        {(pp) => {
          return (
            <TextField
              size="small"
              label={props.label}
              type={props.type}
              {...pp.field}
              error={pp.form.errors[props.name] && pp.form.touched[props.name]}
              name={props.name}
            />
          );
        }}
      </Field>
      <ErrorMessage component={ErrorMsg} name={props.name} />
    </div>
  );
};

export default input;
