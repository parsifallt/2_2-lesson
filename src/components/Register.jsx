import { Button as MuiButton } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/joy";
import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signupAPI } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../slices/authSlice";
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function Register() {
    const ref = useRef(null);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {};
        formData.forEach((value, key) => {
            body[key] = value;
        });
        try {
            const res = await signupAPI(body);

            const token = res.token;
            dispatch(setUser(res.user));
            dispatch(setIsAuthenticated(true));
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
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="text" placeholder="email" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Your name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input
                            name="age"
                            type="number"
                            placeholder="Your age"
                        />
                    </FormControl>
                    <MuiButton
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            name="image"
                            ref={ref}
                            onChange={(event) =>
                                console.log(event.target.files)
                            }
                            multiple
                        />
                    </MuiButton>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup name="gender" defaultValue="male">
                            <Radio value="male" label="Male" />
                            <Radio value="female" label="Female" />
                        </RadioGroup>
                    </FormControl>

                    <Button sx={{ mt: 1 }} type="submit">
                        Sign in
                    </Button>
                    <Typography
                        endDecorator={
                            <NavLink to={"/login"} className={"text-blue-600"}>
                                Log in
                            </NavLink>
                        }
                        sx={{ fontSize: "sm", alignSelf: "center" }}
                    >
                        Already have an account?
                    </Typography>
                </Sheet>
            </form>
        </div>
    );
}
