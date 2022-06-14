import React from "react";

const Profile = (props) => {
    let { currUser, setCurrUser } = props;
    return (
        <div style={{ padding: "3rem" }}>
            {currUser ? (
                <div>
                    <h1>In profile page</h1>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currUser.user.username}</strong>
                        </h3>
                    </header>
                    <p>
                        <strong>ID: {currUser.user._id}</strong>
                    </p>
                    <p>
                        <strong>Email: {currUser.user.email}</strong>
                    </p>
                    <p>
                        <strong>Token: {currUser.token}</strong>
                    </p>
                </div>
            ) : (
                <div className="alert alert-warning">
                    You must login first before getting your profile
                </div>
            )}
        </div>
    );
};

export default Profile;
