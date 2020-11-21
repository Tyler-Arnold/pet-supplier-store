import { useState } from "react";
import { createContainer } from "unstated-next";
import firebase from "firebase";

function useUser() {
  let [user, setUser] = useState<firebase.User | null>();
  let [token, setToken] = useState<string | null>();

  const updateUser = async (upUser?: firebase.User) => {
    const newUser = upUser ? upUser : user ? user : null;

    setUser(newUser);
    setToken(await newUser?.getIdToken());
  };

  firebase.auth().onAuthStateChanged(async (user) => {
    setUser(user);
    setToken(await user?.getIdToken());
  });

  return { user, updateUser, token };
}

export const UserContainer = createContainer(useUser);
