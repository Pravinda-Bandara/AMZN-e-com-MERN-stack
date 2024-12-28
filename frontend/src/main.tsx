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




import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./Store.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import AdminDashboard from './pages/AdminPages/AdminDashboard/AdminDashboard.tsx';
import CartPage from "./pages/UserPages/CartPage/CartPage.tsx";
import OrderHistoryPage from "./pages/UserPages/OrderHistoryPage/orderHistoryPage.tsx";
import OrderListPage from "./pages/AdminPages/OrderListPage/orderListPage.tsx";
import OrderPage from "./pages/UserPages/OrderPage/orderPage.tsx";
import OrderPageAdmin from "./pages/AdminPages/OrderPage/orderPage.tsx";
import PaymentMethodPage from "./pages/UserPages/PaymentMethodPage/PaymentMethodPage.tsx";
import PlaceOrderPage from "./pages/UserPages/PlaceOrderPage/PlaceOrderPage.tsx";
import ProductPage from "./pages/UserPages/ProductPage/ProductPage.tsx";
import ShippingAddressPage from "./pages/UserPages/ShippingAddressPage/ShippingAddressPage.tsx";
import SigninPage from "./pages/UserPages/SigninPage/SigninPage.tsx";
import UserListPage from "./pages/AdminPages/UserListPage/userListPage.tsx";
import SignupPage from "./pages/UserPages/SignupPage/SignupPage.tsx";
import { ProductListPage1 } from './pages/AdminPages/ProductListPage1/ProductListPage1.tsx';
import ProductPageAdmin from './pages/AdminPages/ProductPage/ProductPage.tsx';
import AdminRoute from './components/AdminRoute.tsx';
import NotFoundPage from './pages/CommenPages/NotFoundPage.tsx';
import { HomePage } from './pages/UserPages/HomePage/HomePage.tsx';
import CreateProductPage from './pages/AdminPages/CreateProductPage/CreateProductPage.tsx';
import Profile from './pages/UserPages/Profile/Profile.tsx';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} element={<HomePage />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="" element={<ProtectedRoute />}>
                <Route path="/orderhistory" element={<OrderHistoryPage />} />
                <Route path="/shipping" element={<ShippingAddressPage />} />
                <Route path="/payment" element={<PaymentMethodPage />} />
                <Route path="/placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="" element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />}>
                    <Route path="orders" element={<OrderListPage />} />
                    <Route path="users" element={<UserListPage />} />
                    <Route path="products" element={<ProductListPage1 />} />
                    <Route path="products/create" element={<CreateProductPage />} />
                    <Route path="product/:slug" element={<ProductPageAdmin />} />
                    <Route path="order/:id" element={<OrderPageAdmin />} />
                </Route>
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
