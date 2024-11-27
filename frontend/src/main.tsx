import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import './index.css';
import { HomePage } from "./pages/HomePage/HomePage.tsx";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./Store.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import OrderHistoryPage from "./pages/OrderHistoryPage/orderHistoryPage.tsx";
import OrderListPage from "./pages/OrderListPage/orderListPage.tsx";
import OrderPage from "./pages/OrderPage/orderPage.tsx";
import PaymentMethodPage from "./pages/PaymentMethodPage/PaymentMethodPage.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage/PlaceOrderPage.tsx";
import ProductListPage from "./pages/ProductListPage/ProductListPage.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import ShippingAddressPage from "./pages/ShippingAddressPage/ShippingAddressPage.tsx";
import SigninPage from "./pages/SigninPage/SigninPage.tsx";
import SignupPage from "./pages/SignupPage/SignupPage.tsx";
import UserEditPage from "./pages/UserEditPage/UserEditPage.tsx";
import UserListPage from "./pages/UserListPage/userListPage.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} element={<HomePage/>}/>
            <Route path="product/:slug" element={<ProductPage/>}/>
            <Route path="signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="" element={<ProtectedRoute />}>
                <Route path="/orderhistory" element={<OrderHistoryPage />} />
                <Route path="/shipping" element={<ShippingAddressPage />} />
                <Route path="/payment" element={<PaymentMethodPage />} />
                <Route path="/placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="orders" element={<OrderListPage />} />
                <Route path="users" element={<UserListPage />} />
                <Route path="user/:id" element={<UserEditPage />} />
                <Route path="products" element={<ProductListPage />} />
            </Route>

        </Route>
    )
);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider>
          <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
              </QueryClientProvider>
          </HelmetProvider>
      </StoreProvider>
  </React.StrictMode>,
)
