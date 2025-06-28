import { Routes, Route } from "react-router";
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="" element={<HomePage/>} />
            <Route path="login" element={<Login/>} />
        </Routes>
    )
}