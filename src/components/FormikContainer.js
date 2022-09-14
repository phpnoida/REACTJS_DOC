import React from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { useRef } from "react";
import ImagePreview from "./ImagePreview";
import TextError from "./TextError";

const FormikContainer = () => {
  const fileRef = useRef(null);
  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
  const dropdownOptions = [
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
  const initialValues = {
    email: "",
    desc: "",
    selectOption: "",
    radioOption: "",
    checkOption: [],
    birthDate: null,
    social: {
      fb: "",
      tw: "",
      insta: "",
    },
    donations: [{ institution: "", percentage: 0 }],
    file: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is Must"),
    desc: Yup.string().required("Please Write Few line"),
    selectOption: Yup.string().required("Please Select Options"),
    radioOption: Yup.string().required("Please Select Options"),
    checkOption: Yup.array().required("Please Select Options"),
    birthDate: Yup.date().required("Date is must").nullable(),
    donations: Yup.array(
      Yup.object({
        institution: Yup.string().required("Insti Name must"),
        percentage: Yup.number()
          .min(1, "perce must be more than 1")
          .max(100, "perce must be less than 100"),
      })
    ),
    file: Yup.mixed().nullable().required("Photo is must")
    .test("FILE_FORMAT", "Unsported file format", (value) => {
       return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    })
    .test("FILE_SIZE", "Uploaded file size too big", (value) => {
      return !value || (value && value.size <= 1024 * 1024);
    }),
  });
  const onSubmit = (values, onSubmitProps) => {
    console.log("form submited", values);
    // date to unix timestamp before sending to api
    console.log(
      "date",
      Math.floor(new Date(values.birthDate).getTime() / 1000)
    );
    // hit API with the values object
    // resetForm to clear all inputs after submitting form
    onSubmitProps.resetForm();
    onSubmitProps.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //   validateOnChange={false}
    >
      {(formik) => {
        console.log("formik->", formik);
        console.log("formik Error", formik.error);
        return (
          // u can use div for placing form
          //u can use other tags for giving form heading
          // then u can start your form
          <Form autoComplete="off">
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
          

            <FormikControl
              control="input"
              //email,password,number , else type is optional
              type="email"
              label="Enter Email"
              name="email"
            />
            <FormikControl control="input" label="Facebook" name="social.fb" />
            <FormikControl control="input" label="Twitter" name="social.tw" />
            <FormikControl
              control="input"
              label="Instagram"
              name="social.insta"
            />
            <FormikControl control="textarea" label="description" name="desc" />
            <FormikControl
              control="select"
              label="Select a topic"
              name="selectOption"
              options={dropdownOptions}
            />
            <FormikControl
              control="radio"
              label="Radio Topics"
              name="radioOption"
              options={radioOptions}
            />
            <FormikControl
              control="checkbox"
              label="Checkbox Topic"
              name="checkOption"
              options={checkboxOptions}
            />
            <FormikControl
              control="date"
              name="birthDate"
              label="Please Select BirthDay"
            />
            <div className="form-row">
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
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
            <button type="reset">Reset</button>
          </Form>
        );
      }}
    </Formik>
  );
};
// Theory
// 1.Three impt components of Formik
// <Form> ->bind onSubmit automatically
// <Field>->onChange,onBlur,value
// <ErrorMessage/>->conditionally render error if any

export default FormikContainer;
