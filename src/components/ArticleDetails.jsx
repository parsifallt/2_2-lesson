import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticleAPI, getArticlesIdAPI } from "./service/api";
import { Button } from "@mui/material";
import { ArrowBackIos, Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [active, setActive] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const deleteHandler = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await deleteArticleAPI(id, token);
                navigate("/");
            } catch (error) {}
        }
    };
    useEffect(() => {
        async function getArticle(id) {
            const res = await getArticlesIdAPI(id);
            setArticle(res);
            if (user)
                user?.username == res?.author
                    ? setActive(true)
                    : setActive(false);
        }
        getArticle(id);
    }, []);

    return (
        <div className="flex justify-center my-10">
            <div className="w-1/2">
                <Link className="pl-24" to="/">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<ArrowBackIos />}
                    >
                        Back
                    </Button>
                </Link>
                <img
                    src={`https://mustafocoder.pythonanywhere.com/api${article.image}`}
                    alt={article.title}
                    className="w-[800px] p-5 mx-auto"
                />
                <h1 className="text-3xl font-bold text-center">
                    {article.title}
                </h1>
                <p className="w-[700px] p-5 mx-auto">{article.content}</p>
                {active && (
                    <div className="flex justify-end gap-5 pr-24 mt-3">
                        <Link to={`/update-article/${id}`}>
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<Edit />}
                            >
                                Update
                            </Button>
                        </Link>
                        <Button
                            onClick={deleteHandler}
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleDetails;
