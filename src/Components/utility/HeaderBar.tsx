import { Link } from "@reach/router";
import firebase from "firebase";
import React, { useState } from "react";
import { useContainer } from "unstated-next";
import { UserContainer } from "../../containers/UserContainer";

const HeaderBar = () => {
  const user = useContainer(UserContainer);
  const photoURL = user.user?.photoURL ?? undefined;
  const userName = user.user?.displayName ?? user.user?.email ?? "Anonymous";

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
        </nav>
        <ProfileDropdown username={userName} photoURL={photoURL} />
      </div>
    </>
  );
};

const ProfileDropdown = (props: { username: string; photoURL?: string }) => {
  const [isProfileDropped, setIsProfileDropped] = useState<boolean>(false);

  const dropdownClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsProfileDropped(!isProfileDropped);
  };
  return (
    <div className="profile-dropdown">
      <ProfileBar
        isShown={!isProfileDropped}
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
  isProfileDropped: boolean;
  username: string;
  photoURL?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div className={`profile-dropdown-menu ${props.isProfileDropped ? "menu-shown" : "menu-hidden"}`}>
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
