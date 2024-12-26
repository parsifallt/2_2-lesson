import { Button as MuiButton } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/joy";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createArticleAPI } from "./service/api";
import { useSelector } from "react-redux";
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

export default function CreateArticle() {
    const ref = useRef(null);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
            author: user?.username,
        };
        formData.forEach((value, key) => {
            body[key] = value;
        });
        try {
            console.log(body);
            
            const res = await createArticleAPI(body, token);

            navigate("/");
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
                            <b>Add Article</b>
                        </Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" type="text" placeholder="title" />
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
                        <FormLabel>Content</FormLabel>
                        <Input
                            name="content"
                            type="text"
                            placeholder="content"
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 }} type="submit">
                        Add
                    </Button>
                </Sheet>
            </form>
        </div>
    );
}
