import React from "react";
import { useSelector } from "react-redux";
const Secret = () => {
  const token = useSelector((state) => state.token);
  const handleClick = async () => {
    const req = await fetch("http://localhost:3000/api/secret", {
      method: "POST",
      credentials: "include",
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
