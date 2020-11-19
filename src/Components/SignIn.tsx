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
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={signInAnonHandler}>
          Sign in Anonymously
        </button>
        <p className="text-center my-3">or</p>
        <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white" onClick={signInWithGoogleHandler}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;
