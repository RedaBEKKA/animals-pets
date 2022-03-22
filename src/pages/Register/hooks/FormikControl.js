import React from "react";
import Checkbox from "../Components/Form2/Components/CheckboxGroup";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
}
export default FormikControl
