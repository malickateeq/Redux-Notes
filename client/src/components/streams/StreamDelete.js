import React from 'react';
import Modal from "../Modal";

export default function streamDelete() {
    const modalAction = (
        <React.Fragment>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary">Delete</button>
        </React.Fragment>
    );
    return (
        <div>
            Delete Modal
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <Modal
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={modalAction}
            />
        </div>
    )
}
