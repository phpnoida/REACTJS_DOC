import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
  },
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("form submitted-->", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is must"),
  email: Yup.string().email("Invalid Email").required("Email is must"),
});

const validateComment = (value) => {
  let error;
  if (!value) {
    error = "UserName already Taken";
  }
  return error;
};
function App() {
  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {(formik) => {
          return (
            <Form>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" />
                <ErrorMessage name="name" />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" />
                <ErrorMessage name="email" />
              </div>
              <div className="form-row">
                <label htmlFor="channel">Channel</label>
                <Field id="channel" name="channel" />
                <ErrorMessage name="channel" />
              </div>
              <div className="form-row">
                <button type="submit" disabled={!formik.isValid}>Send</button>
              </div>
              <div className="form-row">
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  validate={validateComment}
                />
                <ErrorMessage name="comments" />
              </div>

              <div className="form-row">
                <label htmlFor="facebook">Facebook</label>
                <Field id="facebook" name="social.facebook" />
                <ErrorMessage name="social.facebook" />
              </div>
              <div className="form-row">
                <label htmlFor="twitter">Twitter</label>
                <Field id="twitter" name="social.twitter" />
                <ErrorMessage name="social.twitter" />
              </div>
              <div className="form-row">
                <label htmlFor="instagram">Instagram</label>
                <Field id="instagram" name="social.instagram" />
                <ErrorMessage name="social.instagram" />
              </div>

              <div className="form-row">
                <label>List of Phone Numbers</label>
                <FieldArray name="phNumbers">
                  {(props) => {
                    const { push, remove, form } = props;
                    const { values } = form;
                    const { phNumbers } = values;

                    return (
                      <div>
                        {phNumbers.map((el, index) => (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                -
                              </button>
                            )}
                            <button
                              onClick={() => {
                                push("");
                              }}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
