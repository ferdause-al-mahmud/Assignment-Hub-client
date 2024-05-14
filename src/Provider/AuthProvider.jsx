/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    //create user with email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //login user with email and password
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    //create user with google

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const loginWithGithub = () => {

        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;

            const loggedUser = { email: userEmail }
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axios.post('https://server-side-eight-topaz.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                    })
            } else {
                axios.post('https://server-side-eight-topaz.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                    })
            }

        });
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = { user, createUser, loading, logOut, logIn, loginWithGoogle, loginWithGithub }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;