import React from 'react';
import Modal from "../Modal";

export default function streamDelete() {
    return (
        <div>
            Delete Modal
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <Modal />
        </div>
    )
}
