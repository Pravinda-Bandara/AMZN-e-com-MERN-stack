import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import {HomePage} from "./pages/HomePage.tsx";



import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProductPage from "./pages/ProductPage.tsx";
import {StoreProvider} from "./Store.tsx";
import CartPage from "./pages/CartPage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ShippingAddressPage from "./pages/ShippingAddressPage.tsx";
import PaymentMethodPage from "./pages/PaymentMethodPage.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import OrderPage from "./pages/orderPage.tsx";
import OrderHistoryPage from "./pages/orderHistoryPage.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import OrderListPage from "./pages/orderListPage.tsx";
import UserListPage from "./pages/userListPage.tsx";
import UserEditPage from "./pages/UserEditPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";


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
