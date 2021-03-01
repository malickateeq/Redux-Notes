import React, { Component } from 'react'
import { reduxForm, Field } from "redux-form";

class StreamCreate extends Component 
{
    renderInput(formProps)
    {
        // console.log(formProps);
        return (
            <input 
                className="form-control" 
                onChange={formProps.input.onChange} 
                value={formProps.input.value}

                // Or Use this to add all properties
                {...formProps.input}
            />
        );
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        {/* Redux Form will send automatically a few props */}
                        <Field name="title" component={this.renderInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <Field name="title2" component={this.renderInput} />
                    </div>
                    <div className="form-check">
                        <Field name="title2" component={this.renderInput} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" name="title3" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "create-stream",  // Form name
})(StreamCreate);