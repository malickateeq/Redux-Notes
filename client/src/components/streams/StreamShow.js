import React from 'react';
import {connect} from "react-redux";
import { fetchStream } from "../../actions";

class streamShow extends React.Component 
{
    componentDidMount()
    {
        this.props.fetchStream(this.props.match.params.id);
    }
    render()
    {
        if(!this.props.stream)
        {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <div className="card">
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <h5 className="card-title"> { title } </h5>
                        <p className="card-text">
                            { description }
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>
{
    return { stream:  state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream})(streamShow);