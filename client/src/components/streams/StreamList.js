import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map((stream) => 
    {
        return (
            <div className="col-md-6" key={stream.id}>
                <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                        <h4 className="my-0 fw-normal">{stream.title}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                            { stream.title }
                        </h1>
                        <p> { stream.description } </p>

                        <div className="row">
                            <div className="col">
                                <button type="button" className="w-100 btn btn-lg btn-outline-primary">
                                Edit
                                </button>
                            </div>
                            <div className="col">
                                <button type="button" className="w-100 btn btn-lg btn-outline-danger">
                                Delete
                                </button>
                            </div>
                        </div>

                    </div>
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
  return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
