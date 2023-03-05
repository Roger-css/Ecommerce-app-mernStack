import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../api/axios";
import { getAllCategories } from "../../../state/reducers/category";
const index = () => {
  const allCategories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    const request = async () => {
      try {
        const req = await axios.get("/category/get");
        dispatch(getAllCategories(req.data.orderCategories));
      } catch (err) {
        console.log(err);
      }
    };
    request();
  }, []);
  const catsDeploy = (param) => {
    return param.map((p) => {
      return (
        <li key={p._id}>
          {p.parentId ? (
            <a href={`/${p.slug}?cid=${p._id}&type=${p.type}`}>{p.name}</a>
          ) : (
            <span>{p.name}</span>
          )}
          {p.children?.length > 0 && <ul>{catsDeploy(p.children)}</ul>}
        </li>
      );
    });
  };
  return (
    <div className="menuHeader">
      <ul>{allCategories.length > 0 && catsDeploy(allCategories)}</ul>
    </div>
  );
};

export default index;
