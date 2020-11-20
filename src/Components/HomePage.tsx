import React, { ReactNode } from "react";
import { RouteComponentProps } from "@reach/router";
import { Item } from "../getters";
import { useContainer } from "unstated-next";
import { UserContainer } from "../containers/UserContainer";
import firebase from "firebase";
import { StockContainer } from "../containers/StockContainer";
import HeaderBar from "./HeaderBar";
import ItemGrid from "./ItemGrid";

const HomePage = (props: RouteComponentProps) => {
  const stock = useContainer(StockContainer).stock;

  return (
    <div>
      <HeaderBar />
      {stock && (
        <>
          <div>
            <ItemGrid items={stock} />
          </div>
        </>
      )}
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};
export default HomePage;
