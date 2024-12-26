import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getArticlesAPI } from "./service/api";
import { NavLink } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
                const a = await getArticlesAPI();
                localStorage.setItem("data", JSON.stringify(a));
                setData(a);
        }
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-4 justify-items-center my-10">
            {data.map((item, index) => (
                <Card sx={{ maxWidth: 345, marginBottom: 2 }} key={index}>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        height="140"
                        image={`https://mustafocoder.pythonanywhere.com/api${item.image}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="line-clamp-3"
                            sx={{ color: "text.secondary" }}
                        >
                            {item.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <NavLink to={`/articles/${item.id}`}>
                            <Button size="small">Learn More</Button>
                        </NavLink>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
