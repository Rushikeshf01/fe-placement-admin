import React from "react";
import { Divider } from "@mui/material";
import College from "./component/College";
import Branch from "./component/Branch";

const University = () => {
  return (
    <div>
      <College />
      <Divider />
      <Branch />
    </div>
  );
};

export default University;
