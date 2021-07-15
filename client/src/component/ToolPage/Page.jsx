import React from "react";
import api from "../../utility/api";

function Page(props) {
  return (
    <div>
      <button
        onClick={() => {
          api.get("/data/getNewSchedule");
        }}
      >
        Fetch New Schedule
      </button>
      <br></br>
      <button
        onClick={() => {
          api.get("/data/getAllDayInfo");
        }}
      >
        Get All Day Info
      </button>
    </div>
  );
}

export default Page;
