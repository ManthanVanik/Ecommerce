import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {useSelector} from "react-redux";
import User from "./pages/User";
import Search from "./pages/Search";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";

function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/products" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate replace to="/" /> :<Register />}/>
        <Route path="/user" element={!user ? <Navigate replace to="/" /> :<User />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/search/:query' element={<Search />}/>
        <Route path='/success' element={<Success />}/>
        <Route path='/cancel' element={<Cancel />}/>
      </Routes>
    </Router>
  );
}

export default App;
