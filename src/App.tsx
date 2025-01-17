import { FirebaseAuthProvider } from "@react-firebase/auth";
import React from "react";
import Application from "./Components/Application";
import { firebaseConfig } from "./firebase";
import firebase from "firebase/app";
import { UserContainer } from "./containers/UserContainer";
import { StockContainer } from "./containers/StockContainer";
import "./App.scss";
import { BasketContainer } from "./containers/BasketContainer";

function App() {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <UserContainer.Provider>
        <StockContainer.Provider>
          <BasketContainer.Provider>
            <Application />
          </BasketContainer.Provider>
        </StockContainer.Provider>
      </UserContainer.Provider>
    </FirebaseAuthProvider>
  );
}
export default App;
