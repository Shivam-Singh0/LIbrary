import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
    return (
        <Spinner animation="border" role="status" variant="info" >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Loader;
