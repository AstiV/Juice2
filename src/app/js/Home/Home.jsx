import React from "react";

import DragNDrop from "./DragNDrop";

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.username : "Stranger"}!</h1>
            <DragNDrop />
        </div>
    );
};

export default Home;
