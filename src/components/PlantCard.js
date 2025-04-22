import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePrice, onDelete }) {
  const { id, name, image, price, soldOut } = plant;
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  function handlePriceSave() {
    if (newPrice !== price) {
      onUpdatePrice(id, parseFloat(newPrice));
    }
    setEditing(false);
  }

  return (
    <li className="plant-card">
      <img src={image} alt={name} />
      <div className="details">
        <h3>{name}</h3>

        {editing ? (
          <>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={handlePriceSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>${price}</p>
            <button onClick={() => setEditing(true)}>Edit Price</button>
          </>
        )}

        <button onClick={() => onToggleSoldOut(id)}>
          {soldOut ? "Back in Stock" : "Sold Out"}
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}

export default PlantCard;
