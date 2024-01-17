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


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} element={<HomePage/>}/>
            <Route path="product/:slug" element={<ProductPage/>}/>
            <Route path="signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/*<Route path="dashboard" element={<Dashboard />} />
             ... etc. */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
        </Route>
    )
);
/*const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "product/:slug",
                element: <ProductPage />,
            },
        ],
    },
]);*/


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider>
          <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
                  <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
          </HelmetProvider>
      </StoreProvider>
  </React.StrictMode>,
)
