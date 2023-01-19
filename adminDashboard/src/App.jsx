import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CssBaseline } from "@mui/material";
import SignIn from "./pages/sign/signIn";
import SignUp from "./pages/sign/signUp";
import Home from "./pages/home/index";
import Categories from "./pages/home/Categories";
import Products from "./pages/home/Products";
import Orders from "./pages/home/orders";
import Secret from "./pages/secret";
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="secret" element={<Secret />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
