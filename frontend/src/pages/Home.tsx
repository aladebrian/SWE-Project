import { useState, useEffect } from "react";
import api from "../api";
import {Grocery, type GroceryItem } from "../components/Grocery.js"
import "../styles/Home.css"

function Home() {
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getGroceries();
    }, []);

    const getGroceries = () => {
        api
            .get("/api/groceries/")
            .then((res) => res.data)
            .then((data) => {
                setGroceries(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteGrocery = (id: number) => {
        api
            .delete(`/api/groceries/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Grocery deleted!");
                else alert("Failed to delete grocery.");
                getGroceries();
            })
            .catch((error) => alert(error));
    };

    const createGrocery = (e: React.FormEvent) => {
        e.preventDefault();
        api
            .post("/api/groceries/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Grocery created!");
                else alert("Failed to make grocery.");
                getGroceries();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Groceries</h2>
                {groceries.map((grocery) => (
                    <Grocery grocery={grocery} onDelete={deleteGrocery} key={grocery.id} />
                ))}
            </div>
            <h2>Create a Grocery</h2>
            <form onSubmit={createGrocery}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;