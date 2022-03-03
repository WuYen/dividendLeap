import React from "react";
import Login from "../user/Login";
import Registration from "../user/Registration";
import Settings from "../user/Settings";
import Validation from "../user/Validation";
import { useRouter } from "../../hooks";

export default function UserContainer(props) {
  const [{ pageType = "login" }, history] = useRouter();
  console.log("UserContainer", pageType);
  switch (pageType) {
    case "registration":
      return <Registration />;
    case "settings":
      return <Settings />;
    case "validation":
      return <Validation />;
    case "login":
    default:
      return <Login />;
  }
}
