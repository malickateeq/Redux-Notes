import React from 'react';
import Modal from "../Modal";
import history from "../../history";
import {connect} from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    modalAction(){
        return (
            <React.Fragment>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button onClick={ () => this.props.deleteStream(this.props.match.params.id) } type="button" className="btn btn-primary">Delete</button>
            </React.Fragment>
        );
    };
    render()
    {
        if(!this.props.stream)
        {
            return(
                <div>
                    Loading...
                </div>
            );
        }
        return (
            <div>
                
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete Stream
                </button>
    
                <Modal
                    title="Delete Stream"
                    content="Are you sure you want to delete this stream?"
                    actions={this.modalAction()}
                    onDismiss={null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream:  state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);