import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthProvider";
import './css/app.css';
import './css/buttons.css';
import './css/form.css';
import './css/reset.css';
import './css/theme.css';
import CategoryCreate from "./pages/Category/CategoryCreate";
import CategoryEdit from "./pages/Category/CategoryEdit";
import CategoryIndex from "./pages/Category/CategoryIndex";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Organization from "./pages/Organization";
import ProductCreate from "./pages/Product/ProductCreate";
import ProductEdit from "./pages/Product/ProductEdit";
import ProductIndex from "./pages/Product/ProductIndex";
import PurchaseCreate from "./pages/Purchase/PurchaseCreate";
import PurchaseEdit from "./pages/Purchase/PurchaseEdit";
import PurchaseIndex from "./pages/Purchase/PurchaseIndex";
import Register from "./pages/Register";
import SupplierCreate from "./pages/Supplier/SupplierCreate";
import SupplierEdit from "./pages/Supplier/SupplierEdit";
import SupplierIndex from "./pages/Supplier/SupplierIndex";


function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  // console.log("USER :::>>>", currentUser);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path={`/dashboard`}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={`/categories`}
            element={
              <RequireAuth>
                <CategoryIndex />
              </RequireAuth>
            }
          />
          <Route
            path={`/categories/create`}
            element={
              <RequireAuth>
                <CategoryCreate />
              </RequireAuth>
            }
          />
          <Route
            path={`/categories/:id`}
            element={
              <RequireAuth>
                <CategoryEdit />
              </RequireAuth>
            }
          />
          <Route
            path={`/products`}
            element={
              <ProductIndex />
            }
          />
          <Route
            path={`/products/create`}
            element={
              <RequireAuth>
                <ProductCreate />
              </RequireAuth>
            }
          />
          <Route
            path={`/products/:id`}
            element={
              <RequireAuth>
                <ProductEdit />
              </RequireAuth>
            }
          />
          <Route
            path={`/organization`}
            element={
              <RequireAuth>
                <Organization />
              </RequireAuth>
            }
          />
          <Route
            path={`/suppliers`}
            element={
              <RequireAuth>
                <SupplierIndex />
              </RequireAuth>
            }
          />
          <Route
            path={`/suppliers/create`}
            element={
              <RequireAuth>
                <SupplierCreate />
              </RequireAuth>
            }
          />
          <Route
            path={`/suppliers/:id`}
            element={
              <RequireAuth>
                <SupplierEdit />
              </RequireAuth>
            }
          />
          <Route
            path={`/purchases`}
            element={
              <RequireAuth>
                <PurchaseIndex />
              </RequireAuth>
            }
          />
          <Route
            path={`/purchases/create`}
            element={
              <RequireAuth>
                <PurchaseCreate />
              </RequireAuth>
            }
          />
          <Route
            path={`/purchases/:id`}
            element={
              <RequireAuth>
                <PurchaseEdit />
              </RequireAuth>
            }
          />
          {/* <Route
            path={`/form`}
            element={
              <RequireAuth>
                <Form />
              </RequireAuth>
            }
          /> */}
          <Route path={`/login`} element={<Login />} />
          <Route path={`/register`} element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
