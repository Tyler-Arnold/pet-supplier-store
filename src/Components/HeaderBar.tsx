import { Link } from "@reach/router";
import React from "react";
import { useContainer } from "unstated-next";
import { UserContainer } from "../containers/UserContainer";

const HeaderBar = () => {
  const user = useContainer(UserContainer);
  const photoURL = user.user?.photoURL;
  const userName = user.user?.displayName ?? user.user?.email ?? "Anonymous";

  return (
    <div className="header-bar">
      <nav className="links">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/profile/">
          <p>Profile</p>
        </Link>
      </nav>
      <div className="profile-dropdown">
        <div className="dropdown-icon">
          <div>V</div>
        </div>
        <div className="profile-name">
          <h2>{userName}</h2>
        </div>
        <div
          className="profile-picture"
          style={{
            background: `url(${
              photoURL || "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            })  no-repeat center center`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeaderBar;
