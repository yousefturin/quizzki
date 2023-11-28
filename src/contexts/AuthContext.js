import React, { useContext, useEffect, useState } from "react";
import { auth, firestore} from "../firebase";



// Create a context for authentication to be used by components
const AuthContext = React.createContext();

// Custom hook to access the authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// Authentication provider component to wrap the application and manage user authentication state
export function AuthProvider({ children }) {
    // State to store the current user and loading status
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [avatarURL, setAvatarURL] = useState(null);

    // Function to sign up a user with email and password
    // Function to sign up a user with email, password, and display name
    async function signup(email, password, displayName) {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Update user profile with display name
        await userCredential.user.updateProfile({
        displayName: displayName,
        });


         const randomSeed = Math.random().toString(36).substring(7);
         const avatarURL = `https://api.dicebear.com/${randomSeed}.x/notionists/svg?backgroundType=gradientLinear`;
    

    
        setAvatarURL(avatarURL);


        // Set the current user state
        setCurrentUser(auth.currentUser);
    }

    // Function to log in a user with email and password
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    // Function to log out the current user
    function logout() {
        return auth.signOut();
    }

    // Function to reset the password for a user
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // Effect hook to listen for changes in the user's authentication state
    useEffect(() => {
        // Set up a listener for authentication state changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            // Update the current user and set loading to false when authentication state changes
            setCurrentUser(user);
            setLoading(false);
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
    }, []);

    // Create an object with values and functions to be provided by the context
    const value = {
        currentUser,
        avatarURL,
        signup,
        login,
        logout,
        resetPassword,
    };

    // Provide the context and its values to the wrapped components
    return (
        <AuthContext.Provider value={value}>
            {/* Render children only when not in a loading state */}
            {!loading && children}
        </AuthContext.Provider>
    );
}
