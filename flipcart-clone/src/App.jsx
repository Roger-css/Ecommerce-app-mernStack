import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ProductsListPage from "./pages/product/index";
import PersistLogin from "./components/persistantLogin";
import Wrapper from "./layout/Wrapper";
import Product from "./pages/singleProduct";
import Cart from "./pages/cart";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<Wrapper />}>
            <Route path="/" exact element={<HomePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path=":slug" element={<ProductsListPage />} />
            <Route path=":productSlug/:product_id/p" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
