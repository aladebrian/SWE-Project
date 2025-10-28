import { useState, useEffect } from "react";
import api from "../api";
import {Grocery, type GroceryItem } from "../components/Grocery.js"
import "../styles/Home.css"

function Home() {
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

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
            .post("/api/groceries/", { name, category, price })
            .then((res) => {
                if (res.status === 201) alert("Grocery created!");
                else alert("Failed to make grocery.");
                getGroceries();
                setName("");
                setCategory("");
                setPrice("");
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
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label htmlFor="category">Category:</label>
                <br />
                <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="price">Price:</label>
                <br />
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;