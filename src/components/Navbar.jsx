import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import { NavLink, useLocation } from "react-router-dom";
import { Add, FiberNew } from "@mui/icons-material";
import { Fab } from "@mui/material";

export default function Navbar() {
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setAuth(localStorage.getItem("token") ? true : false);
        setLoadingLogin(false);
        setLoadingRegister(false);
    }, [location]);

    const handleClickLogin = () => {
        setLoadingRegister(false);
        setLoadingLogin(true);
    };

    const handleClickRegister = () => {
        setLoadingLogin(false);
        setLoadingRegister(true);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <FiberNew />
                        </IconButton>
                    </NavLink>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        News
                    </Typography>
                    {auth ? (
                        <div>
                            <NavLink to={"/create-article"}>
                                <Fab
                                    size="large"
                                    sx={{ mr: 8, width: 40, height: 40 }}
                                    color="primary"
                                    aria-label="add"
                                >
                                    <Add />
                                </Fab>
                            </NavLink>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                className="hover:bg-slate-600"
                                sx={{ height: 65, width: 65 }}
                            >
                                <img
                                    src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
                                    alt=""
                                    className="w-full h-full rounded-full"
                                />
                            </IconButton>
                            <Menu
                                sx={{ mt: "45px", mr: "10px" }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        localStorage.removeItem("token");
                                        window.location.reload();
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <div>
                                <NavLink
                                    to="/login"
                                    className="hover:bg-slate-600"
                                >
                                    <LoadingButton
                                        onClick={handleClickLogin}
                                        loading={loadingLogin}
                                        color="inherit"
                                        className="hover:bg-slate-600"
                                        variant="outlined"
                                    >
                                        Login
                                    </LoadingButton>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/register"
                                    className="hover:bg-slate-600"
                                >
                                    <LoadingButton
                                        onClick={handleClickRegister}
                                        loading={loadingRegister}
                                        color="inherit"
                                        className="hover:bg-slate-600"
                                        variant="outlined"
                                    >
                                        Register
                                    </LoadingButton>
                                </NavLink>
                            </div>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
