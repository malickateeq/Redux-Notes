import React, { Component } from 'react'
import { reduxForm, Field } from "redux-form";

class StreamForm extends Component 
{
    renderInput({input, label, meta})
    {
        return (
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">{label}</label>
                <input 
                    className={"form-control " + ( (meta.error && meta.visited) ? "is-invalid" : "")} 
                    onChange={input.onChange} 
                    value={input.value}
                    autoComplete="off"
                    // Or Use this to add all properties
                    {...input}
                />
                <div className="invalid-feedback">
                    { meta.error }
                </div>
            </div>
        );
    }
    onSubmit = (formValues) =>
    {
        this.props.onSubmit(formValues);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {/* Redux Form will send automatically a few props */}
                    <Field name="title" label="Title" component={this.renderInput} />
                    <Field name="description" label="Description" component={this.renderInput} />
                    <button type="submit" name="title3" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => 
{
    const errors = {};
    if(!formValues.title){
        errors.title = "Please enter title";
    }
    if(!formValues.description){
        errors.description = "Please enter description";
    }

    // Return an empty object where redux-form thinks all validations errors are passed. 
    return errors;
}

export default reduxForm({
    form: "streamForm",  // Form name
    validate: validate
})(StreamForm);