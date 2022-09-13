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
