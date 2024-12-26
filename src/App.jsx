import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import ArticleDetails from "./components/ArticleDetails";
import CreateArticle from "./components/CreateArticle";
import { useDispatch } from "react-redux";
import { getUserAPI } from "./components/service/api";
import { setIsAuthenticated, setUser } from "./slices/authSlice";
import { useEffect } from "react";
import UpdateArticle from "./components/UpdateArticle";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const ls = localStorage.getItem("token");
        const getUserHandler = async (token) => {
            try {
                const res = await getUserAPI(token);
                dispatch(setUser(res));
                dispatch(setIsAuthenticated(true));
            } catch (error) {
                localStorage.removeItem("token");
            }
        };
        if (ls) {
            getUserHandler(ls);
        }
    }, []);
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-article" element={<CreateArticle />} />
                <Route path="/update-article/:id" element={<UpdateArticle />} />
                <Route path="/articles/:id" element={<ArticleDetails />} />
            </Routes>
        </div>
    );
}
