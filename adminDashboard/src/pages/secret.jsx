import React from "react";
import { useSelector } from "react-redux";
const Secret = () => {
  const token = useSelector((state) => state.token);
  const handleClick = async () => {
    const req = await fetch("http://localhost3000/api/secret", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    console.log(req);
    console.log(res);
  };
  return <button onClick={handleClick}>click me</button>;
};

export default Secret;
