import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Checkbox =(props)=>{
    const {label,name,options,...rest}=props;
    // render props pattern needs here
    //opening and closing tag
    //will have arrow function as children
    // that arrow must return some jsx
    return (
        <div className="form-row">
            <label>{label}</label>
            <Field name={name} {...rest}>
                {
                    (props)=>{
                        //field will take care of name,value,onchange,blur
                        // field actually allows formik to take control on our Checkbox button otherwise formik will not work
                        // must return jsx
                        const {field}=props;
                        // iterate over options array
                        return  options.map((option)=>{
                            // must return label and input
                            return (
                                <React.Fragment key={option.key}>
                                    {/* value used again to overite from field props value */}
                                    <input type='checkbox' id={option.value} {...field} value={option.value} checked={field.value.includes(option.value)}/>
                                    <label htmlFor={option.value}>{option.key}</label>
                                </React.Fragment>


                            )
                        })
                    }
                }


            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )


}
export default Checkbox;