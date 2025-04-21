import React, { useState } from "react";

function PlantCard({ plant, onPriceUpdate, onDelete }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(plant.price);

  const toggleSoldOut = () => {
    setIsSoldOut(!isSoldOut);
  };

  const handlePriceSave = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(price) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onPriceUpdate(updatedPlant);
        setEditing(false);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDelete(plant.id));
  };

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <div>
        {editing ? (
          <>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "80px", marginRight: "5px" }}
            />
            <button className="primary" onClick={handlePriceSave}>
              Save 💾
            </button>
          </>
        ) : (
          <p>Price: ${price}</p>
        )}
      </div>
      <button
        className={isSoldOut ? "secondary" : "primary"}
        onClick={toggleSoldOut}
      >
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>
      <button
        style={{ backgroundColor: "orange", marginTop: "5px" }}
        onClick={() => setEditing(!editing)}
      >
        {editing ? "Cancel" : "Edit Price ✏️"}
      </button>
      <button
        style={{ backgroundColor: "crimson", color: "white", marginTop: "5px" }}
        onClick={handleDelete}
      >
        Delete 🗑️
      </button>
    </li>
  );
}

export default PlantCard;
