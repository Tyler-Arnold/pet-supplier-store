import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useContainer } from "unstated-next";
import firebase from "firebase";
import { StockContainer } from "../../containers/StockContainer";
import HeaderBar from "../utility/HeaderBar";
import ItemGrid from "../utility/ItemGrid";

const HomePage = (props: RouteComponentProps) => {
  const stock = useContainer(StockContainer).stock;

  return (
    <div>
      <HeaderBar />
      {stock && <ItemGrid items={stock} />}
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
