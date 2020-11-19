import { useState } from "react";
import { createContainer } from "unstated-next";
import firebase from "firebase";

function useUser() {
  let [user, setUser] = useState<firebase.User | null>();
  let [token, setToken] = useState<string | null>();

  firebase.auth().onAuthStateChanged(async (user) => {
    setUser(user);
    setToken(await user?.getIdToken());
  });

  return { user, token };
}

export const UserContainer = createContainer(useUser);
