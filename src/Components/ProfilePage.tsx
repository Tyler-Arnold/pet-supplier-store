import React from "react";
import firebase from "firebase";
import { RouteComponentProps } from "@reach/router";
import { useContainer } from "unstated-next";
import { UserContainer } from "../containers/UserContainer";
const ProfilePage = (props: RouteComponentProps) => {
  const user = useContainer(UserContainer).user;
  const photoURL = user?.photoURL;
  const displayName = user?.displayName;
  const email = user?.email;

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
        </div>
      </div>
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
export default ProfilePage;
