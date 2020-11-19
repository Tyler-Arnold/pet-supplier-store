import React, { useEffect } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import { useContainer } from "unstated-next";
import { UserContainer } from "../containers/UserContainer";
import { StockContainer } from "../containers/StockContainer";

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
    <Router>
      <HomePage path="/" />
      <ProfilePage path="/Profile/" />
    </Router>
  ) : (
    <Router>
      <SignIn path="/" />
    </Router>
  );
}
export default Application;
