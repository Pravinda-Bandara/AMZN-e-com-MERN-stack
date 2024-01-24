import React, {useContext} from "react";
import {Store} from "../Store.tsx";
import {Navigate, Outlet} from "react-router-dom";

export function ProtectedRoute() {
    const {
        state: { userInfo },
    } = useContext(Store)

    if (userInfo) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }
}