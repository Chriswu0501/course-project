import React from "react";

const Profile = (props) => {
    let { currUser, setCurrUser } = props;
    return (
        <div style={{ padding: "3rem" }}>
            {currUser ? (
                <div className="card">
                    <div className="card-header">In profile page</div>
                    <div className="card-body">
                        <h3 className="card-title">
                            <strong>{currUser.user.username}</strong>
                        </h3>
                        <p>
                            <strong>ID: {currUser.user._id}</strong>
                        </p>
                        <p>
                            <strong>Email: {currUser.user.email}</strong>
                        </p>
                        <p>
                            <strong>Token: {currUser.token}</strong>
                        </p>
                        <p>
                            <strong>Role: {currUser.user.role}</strong>
                        </p>
                    </div>
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
