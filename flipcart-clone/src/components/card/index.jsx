import React from "react";
import "./style.css";

const Card = (props) => {
  return (
    <div className="UIcard" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader">
          {props.headerleft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {props.headerleft}
            </div>
          )}
          {props.headerright && props.headerright}
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Card;
