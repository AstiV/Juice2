import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
    render() {
        if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

        return (
            <div className="container">
                <h1>{this.props.user.username}</h1>
                <div className="profilePicture">
                    <img src={this.props.user.profilePicture} alt="" />
                </div>
            </div>
        );
    }
}

export default Profile;
