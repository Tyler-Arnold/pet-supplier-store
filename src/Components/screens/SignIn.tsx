import React from "react";
import { RouteComponentProps } from "@reach/router";
import firebase from "firebase";
import HeaderBar from "../utility/HeaderBar";

const SignIn = (props: RouteComponentProps) => {
  const signInAnonHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    firebase.auth().signInAnonymously();
  };

  const signInWithGoogleHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(authProvider);
  };

  return (
    <div>
      <HeaderBar />
      <h1>Sign In</h1>
      <div>
        <button onClick={signInAnonHandler}>Sign in Anonymously</button>
        <p>or</p>
        <button onClick={signInWithGoogleHandler}>Sign in with Google</button>
      </div>
    </div>
  );
};
export default SignIn;
