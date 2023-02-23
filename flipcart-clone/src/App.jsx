import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ProductsListPage from "./pages/product/productsListPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path=":slug" element={<ProductsListPage />} />
      </Routes>
    </div>
  );
}

export default App;
