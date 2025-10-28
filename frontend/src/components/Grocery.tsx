import "../styles/Grocery.css"
type GroceryItem = {
    id: number;
    name: string;
    category: string;
    price: number;
}
type GroceryProps = {
    grocery: GroceryItem;
    onDelete: (id: number) => void;
}

function Grocery({ grocery, onDelete }: GroceryProps) {

    return (
        <div className="grocery-container">
            <p className="grocery-name">{grocery.name}</p>
            <p className="grocery-category">{grocery.category}</p>
            <p className="grocery-price">{grocery.price}</p>
            <button className="delete-button" onClick={() => onDelete(grocery.id)}>
                Delete
            </button>
        </div>
    );
}

export {Grocery, type GroceryItem};