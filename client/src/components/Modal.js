import React from 'react';
import ReactDOM from "react-dom";
import history from "../history";

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            { props.title }
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { props.content }
                    </div>
                    <div className="modal-footer">
                        { props.actions }
                    </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    )
}

export default Modal;