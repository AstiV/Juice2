import React from "react";

import PdfUpload from "./PdfUpload";

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.username : "Stranger"}!</h1>
            {!props.user && <p>Sign up or sign in to upload a PDF file and extract the text</p>}
            {props.user && <PdfUpload />}
        </div>
    );
};

export default Home;
