import { Link } from "@reach/router";
import firebase from "firebase";
import React, { useState } from "react";
import { useContainer } from "unstated-next";
import { BasketContainer } from "../../containers/BasketContainer";
import { UserContainer } from "../../containers/UserContainer";

const HeaderBar = () => {
  const user = useContainer(UserContainer);
  const photoURL = user.user?.photoURL ?? undefined;
  const userName = user.user?.displayName ?? user.user?.email ?? "Anonymous";

  const basketCount = useContainer(BasketContainer).basket?.length ?? 0;

  return (
    <>
      <div className="header-bar">
        <nav className="links">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/items/">
            <p>Products</p>
          </Link>
          <Link to="/specials/">
            <p>Special Offers</p>
          </Link>
          <Link to="/profile/">
            <p>Other Stuff</p>
          </Link>
          <Link to="/basket/">
            <p>Basket{basketCount > 0 ? ` (${basketCount})` : ""}</p>
          </Link>
        </nav>
        <ProfileDropdown username={userName} photoURL={photoURL} />
      </div>
    </>
  );
};

const ProfileDropdown = (props: { username: string; photoURL?: string }) => {
  const [isProfileDropped, setIsProfileDropped] = useState<"dropped" | "hidden" | "hiding">("hidden");

  const dropdownClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (isProfileDropped === "dropped") {
      setIsProfileDropped("hiding");
      setTimeout(() => setIsProfileDropped("hidden"), 1000);
    } else if (isProfileDropped === "hidden") {
      setIsProfileDropped("dropped");
    }
  };
  return (
    <div className="profile-dropdown">
      <ProfileBar
        isShown={isProfileDropped === "dropped" ? false : true}
        username={props.username}
        photoURL={props.photoURL}
        onClick={dropdownClickHandler}
      />
      <ProfileDropdownMenu
        isProfileDropped={isProfileDropped}
        username={props.username}
        photoURL={props.photoURL}
        onClick={dropdownClickHandler}
      />
    </div>
  );
};

const ProfileDropdownMenu = (props: {
  isProfileDropped: "dropped" | "hidden" | "hiding";
  username: string;
  photoURL?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div className={`profile-dropdown-menu menu-${props.isProfileDropped}`}>
      <div
        className="sign-out dropdown-bar"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        <h4>Sign Out</h4>
      </div>
      <div className="profile-link dropdown-bar">
        <Link to="/profile/">
          <h4>Profile</h4>
        </Link>
      </div>
      <ProfileBar username={props.username} photoURL={props.photoURL} onClick={props.onClick} />
    </div>
  );
};

const ProfileBar = (props: {
  username: string;
  photoURL?: string;
  isShown?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  let isShown = props.isShown;
  if (isShown === undefined) {
    isShown = true;
  }

  return (
    <div className={`profile-bar ${isShown ? "shown" : "bar-hidden"}`} onClick={props.onClick}>
      <div className="dropdown-icon">
        <div>V</div>
      </div>
      <div className="profile-name">
        <h2>{props.username}</h2>
      </div>
      <div
        className="profile-picture"
        style={{
          background: `url(${
            props.photoURL ||
            "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
          })  no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default HeaderBar;
