import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/joy";
import { getArticlesIdAPI, updateArticleAPI } from "./service/api";

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

export default function UpdateArticle() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const ref = useRef(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticlesIdAPI(id);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = { author: user?.username };

        if (ref.current?.files[0]) {
            body.image = ref.current.files[0];
        }

        formData.forEach((value, key) => {
            if (key !== "image") {
                body[key] = value;
            }
        });

        try {
            console.log(body);

            const updatedArticle = await updateArticleAPI(id, body, token);
            console.log(updatedArticle.id, id);

            navigate(`/articles/${updatedArticle.id}`);
        } catch (error) {
            console.error(
                "Error updating article:",
                error.response?.data || error.message
            );
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
                    <Typography level="h4" component="h1">
                        <b>Update Article</b>
                    </Typography>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <MuiButton
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Files
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
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 }} type="submit">
                        Update
                    </Button>
                </Sheet>
            </form>
        </div>
    );
}
