import React from 'react';
import {Link} from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

export default function Header() {
    return (
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                
                <h5 className="my-0 mr-md-auto font-weight-normal">
                    <Link to="/"> 
                        Malik Ateeq
                    </Link>
                </h5>

                <nav className="my-2 my-md-0 mr-md-3">
                    <Link className="p-2 text-dark" to="/">All Streams</Link>
                </nav>

                <GoogleAuth />
                
                {/* <Link className="btn btn-outline-primary" to="#">GoogleAuth</Link> */}
            </div>
        </div>
    )
}
