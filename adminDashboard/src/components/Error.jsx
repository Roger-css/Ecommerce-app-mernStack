import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
const ErrorMsg = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#c40000",
        marginTop: "5px",
        fontSize: "18px",
      }}
    >
      <PriorityHighIcon fontSize="" />
      <p style={{ margin: "0", marginLeft: "5px", fontSize: "12px" }}>
        {props.children}
      </p>
    </div>
  );
};

export default ErrorMsg;
