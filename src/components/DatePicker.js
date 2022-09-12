import { ErrorMessage, Field } from "formik";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "./TextError";

const DatePicker = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-row">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(props) => {
          const { form, field } = props;
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => {
                setFieldValue(name, val);
              }}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              isClearable
              showYearDropdown
              showMonthDropdown
              scrollableMonthYearDropdown
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>

  );
};
export default DatePicker;
