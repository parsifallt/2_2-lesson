import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../slices/authSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const body = JSON.stringify({
            username: data.get("username"),
            password: data.get("password"),
        });
        try {
            const res = await loginAPI(body);
            dispatch(setUser(res.user));
            dispatch(setIsAuthenticated(true));
            const token = res.token;
            localStorage.setItem("token", token);

            const tokenFromLocalStorage = localStorage.getItem("token");
            if (tokenFromLocalStorage) {
                navigator("/");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Sheet
                    sx={{
                        width: 300,
                        mx: "auto",
                        my: 4,
                        py: 3,
                        px: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        borderRadius: "sm",
                        boxShadow: "md",
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body-sm">
                            Sign in to continue.
                        </Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            type="text"
                            placeholder="username"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 }} type="submit">
                        Log in
                    </Button>
                    <Typography
                        endDecorator={
                            <NavLink
                                to={"/register"}
                                className={"text-blue-600"}
                            >
                                Sign up
                            </NavLink>
                        }
                        sx={{ fontSize: "sm", alignSelf: "center" }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
            </form>
        </div>
    );
}
