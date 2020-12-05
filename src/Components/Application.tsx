import React, { useEffect } from "react";
import { Router } from "@reach/router";
import SignIn from "./screens/SignIn";
import ProfilePage from "./screens/ProfilePage";
import HomePage from "./screens/HomePage";
import { useContainer } from "unstated-next";
import { UserContainer } from "./../containers/UserContainer";
import { StockContainer } from "./../containers/StockContainer";
import ItemPage from "./screens/ItemPage";
import BasketPage from "./screens/BasketPage";
import NewItemPage from "./screens/NewItemPage";
import UpdateItemPage from "./screens/UpdateItemPage";

function Application() {
  const user = useContainer(UserContainer).user;
  const token = useContainer(UserContainer).token;
  const stockContainer = useContainer(StockContainer);

  // Updates stock when the user's token changes
  // Has to be done here because useEffect can't be used outside of a React Component
  useEffect(() => {
    stockContainer.RetrieveStock();
    //this eslint rule is causing me more trouble than its worth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return user ? (
    user.isAnonymous ? ( // Anonymous users
      <Router>
        <HomePage path="/" />
        <HomePage path="/items/" />
        <ItemPage path="/item/:itemId" />
        <ProfilePage path="/specials/" />
        <ProfilePage path="/profile/" />
        <BasketPage path="/basket/" />
      </Router>
    ) : (
      // Authenticated users
      <Router>
        <HomePage path="/" />
        <HomePage path="/items/" />
        <ItemPage path="/item/:itemId" />
        <ProfilePage path="/specials/" />
        <ProfilePage path="/profile/" />
        <BasketPage path="/basket/" />
        <NewItemPage path="/item/new/" />
        <UpdateItemPage path="/item/update/:itemId" />
      </Router>
    )
  ) : (
    <Router>
      <SignIn path="/" default={true} />
    </Router>
  );
}
export default Application;
