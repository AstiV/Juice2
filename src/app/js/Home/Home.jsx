import React from "react";

// import DragNDrop from "./DragNDrop";
import PdfUpload from "./PdfUpload";

import Sample from "./Sample";

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.username : "Stranger"}!</h1>
            {/* {props.user && <DragNDrop />} */}
            {props.user && <PdfUpload />}
            <Sample />
        </div>
    );
};

export default Home;
