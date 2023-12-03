import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Replace with your actual auth context

const UserPrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    const { uid } = useParams();
    // If there is no authenticated user, redirect to login
    if (!currentUser) {
        return <Navigate to="/error" />;
    }
    // ** My mistake was not checking the useParams uid of teh accessing user.
    // Check if the authenticated user has the same userId as the profile
    if (currentUser.uid === uid) {
        return element;
    } else {
        // Redirect to an error page if the user doesn't have access
        return <Navigate to="/error" />;
    }
};

export default UserPrivateRoute;
