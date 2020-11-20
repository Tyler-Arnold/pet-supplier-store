import React, { ReactNode } from "react";
import { RouteComponentProps } from "@reach/router";
import { Item } from "../getters";
import { useContainer } from "unstated-next";
import { UserContainer } from "../containers/UserContainer";
import firebase from "firebase";
import { StockContainer } from "../containers/StockContainer";

const HomePage = (props: RouteComponentProps) => {
  const user = useContainer(UserContainer);
  const stock = useContainer(StockContainer).stock;
  const photoURL = user.user?.photoURL;
  const displayName = user.user?.displayName;
  const email = user.user?.email;

  const itemsinstock = (items: Item[]): ReactNode[] => {
    return items.map((item, i) => {
      return (
        <div key={`${i}-div`}>
          <h4>
            {item.title} {item.id}
          </h4>
          <p>{item.description}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div
          style={{
            background: `url(${
              photoURL || "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            })  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
        ></div>
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
          <h3>{JSON.stringify(stock)}</h3>
        </div>
      </div>
      {stock && (
        <>
          <div>{itemsinstock(stock)}</div>
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
