import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream){
    if(stream.userId === this.props.currentUserId)
    {
      return (
          <div className="row">
              <div className="col">
                <Link className="w-100 btn btn-lg btn-outline-primary" to={`stream/edit/${stream.id}`}>
                  Edit
                </Link>
              </div>
              <div className="col">
                <Link className="w-100 btn btn-lg btn-outline-danger" to={`stream/delete/${stream.id}`}>
                  Delete
                </Link>
              </div>
          </div>
      );
    }
  }

  renderCreate(){
    if(this.props.isSignedIn)
    {
      return (
        <div>
          <Link className="btn btn-primary" to="stream/new">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => 
    {
        return (
            <div className="col-md-6" key={stream.id}>
                <div className="card mb-4 shadow-sm py-3">
                    <div className="card-header">
                        <h4 className="my-0 fw-normal">{stream.title}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                            { stream.title }
                        </h1>
                        <p> { stream.description } </p>

                        { this.renderAdmin(stream) }
                    </div>

                    { this.renderCreate() }

                </div>
            </div>
        );
    });
  }

  render() {
    return (
      <div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className="row">
                { this.renderList() }
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Object.values(state.streams): Get values from object "state.streams" and insert then into an "Array".
  return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
