## FORMS IN REACT WITH FORMIK

- npm i formik
- npm i yup (for validating form)
- The most impt thing is the "name" attribute must be the same everywhere

### MAKE FOLLOWING FILES IN COMPONENT FOLDER

- FormikContainer.js
- FormControl.js
- Input.js
- Radio.js
- Select.js
- Checkbox.js
- Textarea.js
- DatePicker.js
- TextError.js

### Let us Start with TextField ,like name , email , password etc

- Step1 FormikContainer.js

```
import { Formik, Form } from "formik";
import * as Yup from "yup";

const FormikContainer =()=>{
    <!-- these are state variables which formik will manage by itself -->
    const initialValues={
        name:'',
        email:'',
        password:'',
        age:''
    }

    const validationSchema=Yup.object({
        name:Yup.string().min(2,'Name not less than 2').max(12,'name not more than 12').required('Name is must'),
        email:Yup.string().email('Invalid EmailId').required('Email is must'),
        website:Yup.string().url('Invalid Url'),
        age:Yup.number().positive('Age not negative')
    })

    const onSubmit =(values,onSubmitProps)=>{
        console.log('Submitting Form',values);
        // date to unix timestamp before sending to api
        console.log(
        "date",
        Math.floor(new Date(values.birthDate).getTime() / 1000)
        );
        // hit API with the values object
        dispatch(httpAddJob(values))
        // resetForm to clear all inputs after submitting form
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
    }

    return (
        <Formik>
        <!-- will take children as function and must return form-->
        {(formik)=>{
            console.log("formik->", formik);
            console.log("formik Error", formik.error);
            return (
                // u can use div for placing form
                //u can use other tags for giving form heading
                // then u can start your form
                //Form component of formik automatically connects onSubmit
                //so no need to pass onSubmit event
                <Form autoComplete='off'>
                    <FormikControl
                        control="input"
                        label="Enter Name"
                        name="name"
                    />
                    <FormikControl
                        control="input"
                        type="email"
                        label="Enter Email"
                        name="email"
                        placeholder="abc@gmail.com"
                    />
                    <FormikControl
                        control="input"
                        type="password"
                        label="Enter Password"
                        name="password"
                    />
                    <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    >
                    Submit
                    </button>
                    <button type="reset">Reset</button>
                </Form>

            )

        }}
        </Formik>
    )

}

```

- step2 FormikControl.js

```
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
        return <Select {...rest}/>
    case "radio":
        return <Radio {...rest}/>
    case "checkbox":
        return <Checkbox {...rest}/>
    case "date":
        return <DatePicker {...rest}/>
    default:
      return null;
  }
};

export default FormikControl;
```

- step3 Input.js
  Note :Field component from formik automatically hooks in onChange,onBlur
  and value so no need to pass these events and value attribute
  ErrorMessage programtically renders errors if any

```
import React from 'react';
import { Field,ErrorMessage} from 'formik';
import TextError from './TextError';
const Input=(props)=>{
    const {label,name,...rest}=props;
    return (
        <div className='form-row'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )

}
export default Input;
```

- step4 TextError.js

```
const TextError=(props)=>{
    console.log('props',props)
    return (
        // use can do css on error
        <div className='error'>
            {props.children}
        </div>
    )

}
export default TextError;
```

### Storing values in Object needed for API

- Step 1 in FormikContainer.js

```
const initialValues={
    social:{
        fb:'',
        tw:'',
        insta:''
    }
}

const validationSchema = Yup.object({
    social:Yup.object({
        fb:Yup.string().url('Invalid url'),
        tw:Yup.string().url('Invalid Twitter url')
    })
})

<FormikControl
  control="input"
  label="Facebook"
  <!-- the most impt is name -->
  name="social.fb"

/>
<FormikControl
  control="input"
  label="Twitter"
  <!-- ultra cautious in name -->
  name="social.tw"

/>
<FormikControl
  control="input"
  label="Instagram"
  <!-- name not social ,it will be social.insta -->
  name="social.insta"

/>
<!-- rest all process same  -->


```

### Textarea

- Step1 FormikContainer.js

```
const initialValues={
    comments:''
}

const validationSchema = Yup.object({
    comments:Yup.string().min('10','Minimum 100 characters').max('200','')
})


<FormikControl
  control="textarea"
  label="Leave Your Comments"
  name="comments"

/>


```

- step 3 make a component Textarea.js

```
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

const Textarea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <!-- as props in Field impt by default as='text' in raw it is type -->
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Textarea;

```

### Dropdowns

- step1 FormikContainer.js
<!-- you can get these from API -->

```
const jobOptions = [
    {
      key: "Select an option",
      value: "",
    },
    {
      key: "Permanent",
      value: "per",
    },
    {
      key: "Contract",
      value: "contr",
    },
    {
      key: "Consulting",
      value: "cons",
    },
    {
      key: "Internship",
      value: "intern",
    },
  ];

const initialValues={
    jobType:''
}

const validationSchema = Yup.object({
    jobType:Yup.string().required('Please select Job Options')
})

<FormikControl
    control="select"
    label="Select Job Type"
    name="jobType"
    options={jobOptions}
/>

```

- step3 create a component Select.jsx

```
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

const Select =(props)=>{
    const {label,name,options,...rest}=props;
    return (
        <div className="form-row">
            <label htmlFor={name}>{label}</label>
            <!-- as props value =select in Field -->
            <Field as='select' id={name} name={name} {...rest}>
            <!-- we will loop the options props to create listings dynamically -->
                {
                    options.map((option)=>{
                        return (
                            <option key={option.value} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>

        </div>
    )

}
export default Select;
```

### Radio buttons

- these are slightly different we will use render props pattern
- step1 FormikContainer.js

```
const radioOptions = [
    {
      key: "Option 1",
      value: "roption1",
    },
    {
      key: "Option 2",
      value: "roption2",
    },
    {
      key: "Option 3",
      value: "roption3",
    },
  ];
const initialState={
    gender:''
}

const validationSchema = Yup.object({
    gender:Yup.string().required('Gender is must')
})

<FormikControl
    control="radio"
    label="Slect Your Gender"
    name="gender"
    options={radioOptions}
/>

```

- step2 make a component Radio.js
- render props pattern will be used
- we pass function as children to Field so Field now will have opng and closing tag
- mainly arrow function
- this arrow must return jsx
- but if we use <input type='radio'> then formik will not be hooked
- in order to let formik have control , we get props in arrow method
- u can console.log(props) which has 3 things field , form ,meta
- field has name,onBlur,onChange and value properties inside it
- meta has error,touched , value
- form which has bunch of helper methods for entire form
- field and meta are on individual field level basis while form is for entire form
- in order to hook input element with formik we need to spread field props
- i.e <input {...field}/> is must , now value,onChnage and onBlur is hooked
- for error at individual field level we can do like this also
- {meta.touched && meta.error ?<div>{meta.error}</div>:null}

```
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Radio = (props) => {
  const { label, name, options, ...rest } = props;
  // render props pattern needs here
  //opening and closing tag
  //will have arrow function as children
  // that arrow must return some jsx
  return (
    <div className="form-row">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {(props) => {
          // must return jsx
          const { field } = props;
          // iterate over options array
          return options.map((option) => {
            // must return label and input
            return (
              <React.Fragment key={option.key}>
                {/* value used again to overite from field props value */}
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  <!-- impt to overide value after spreading field -->
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
export default Radio;


```

### checkbox

- flow is same as radio button
- step1 FormikContainer.js

```
const checkboxOptions = [
    {
      key: "Option 1",
      value: "coption1",
    },
    {
      key: "Option 2",
      value: "coption2",
    },
    {
      key: "Option 3",
      value: "coption3",
    },
  ];

const initialState={
    <!-- impt must be of array type -->
    hobbies :[]
}

const validationSchema = Yup.object({
    hobbies:Yup.array().required('Pls select 1 hobby')
})

<FormikControl
    control="checkbox"
    label="Please select hobbies"
    name="hobbies"
    options={checkboxOptions}
/>
```

- step2 create component Checkbox.js

```
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Checkbox = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-row">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {(props) => {
          const { field } = props;
          // iterate over options array
          return options.map((option) => {
            // must return label and input
            return (
              <React.Fragment key={option.key}>
                {/* value used again to overite from field props value */}
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
export default Checkbox;

```

### Date Calendar

- step1 npm i react-datepicker
- step2 go to FormikContainer.js

```
const initialState={
    birthDate:null
}
const validationSchema=Yup.object({
    birthDate:Yup.date().nullable()
})

<FormikControl
    control="date"
    name="birthDate"
    label="Please Select BirthDay"
    />
```

- step3 create component DatePicker.js

```
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


```

### FieldArray for array of objects

- step1 FormikContainer.js

```
const initialValues={
  <!-- must be of array -->
  donations: [{ institution: "", percentage: 0 }],
}

const validationSchema =Yup.object({
  donations:Yup.array(Yup.object({
      institution:Yup.string().required('Insti Name must'),
      percentage:Yup.number().min(1,'perce must be more than 1').max(100,'perce must be less than 100')

    }))
})
 <FieldArray name="donations">
      {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { donations } = values;

                  return (
                    <div>
                      {donations.map((_, index) => {
                        return (
                          <div key={index}>
                            <Field name={`donations[${index}].institution`} />
                            <ErrorMessage
                              name={`donations[${index}].institution`}
                              component={TextError}
                            />
                            <Field name={`donations[${index}].percentage`} />
                            <ErrorMessage
                              name={`donations[${index}].percentage`}
                              component={TextError}
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Delete
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                console.log("clicked...");
                                push({ institution: "", percentage: 0 });
                              }}
                            >
                              Add More
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
```

### File Upload

- step1 FormikContainer.js

```
const fileRef = useRef(null);
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const initialValues={
  file:''
}
const validationSchema=Yup.object({
  file: Yup.mixed().nullable().required("Photo is must")
    .test("FILE_FORMAT", "Unsported file format", (value) => {
       return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    })
    .test("FILE_SIZE", "Uploaded file size too big", (value) => {
      return !value || (value && value.size <= 1024 * 1024);
    })
})

<input
  hidden
  ref={fileRef}
  type="file"
  name="file"
  onChange={(event) => {
  formik.setFieldValue("file", event.target.files[0]);
      }}
/>
{formik.errors.file && <p>{formik.errors.file}</p>}
{!formik.errors.file && formik.values.file && <ImagePreview file={formik.values.file} />}
<button
  type="button"
  onClick={() => {
                fileRef.current.click();
              }}
>
Upload Photo
</button>

```

- step2 create component ImagePreview.js

```
import { useState } from "react";

const ImagePreview = (props) => {
  const { file } = props;
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      {preview ? (
        <img src={preview} height="200px" width="200px" alt=''/>
      ) : (
        "Loading.."
      )}
    </div>
  );
};

export default ImagePreview;

```
