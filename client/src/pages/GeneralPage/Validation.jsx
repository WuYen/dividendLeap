import React, { useState } from "react";
import { api } from "../../utils";

export default function Validation(props) {
  const queryString = new URLSearchParams(window.location.search).get("t");
  let [result, setresult] = useState("failed");
  if (queryString && queryString != "") {
    let validateresult = api.post("/accountvalidate", queryString);
    setresult(validateresult);
    window.location.search = "";
    console.log(result);
  }
  return (
    <>
      <div>{result}</div>
    </>
  );
}
