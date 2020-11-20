import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import firebase from "firebase";

const SignIn = (props: RouteComponentProps) => {
  const [error, setError] = useState(null);
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
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <button onClick={signInAnonHandler}>Sign in Anonymously</button>
        <p>or</p>
        <button onClick={signInWithGoogleHandler}>Sign in with Google</button>
      </div>
    </div>
  );
};
export default SignIn;
