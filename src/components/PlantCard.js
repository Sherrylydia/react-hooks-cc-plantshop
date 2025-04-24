import React from "react";

function PlantCard({ plant, onToggleSoldOut, onDelete }) {
  const { id, name, image, price, soldOut } = plant;

  const imageStyle = soldOut ? { filter: "grayscale(100%)", opacity: 0.5 } : {};
  const nameStyle = soldOut ? { textDecoration: "line-through" } : {};

  return (
    <li className="plant-card">
      <img src={image} alt={name} style={imageStyle} />
      <div className="details">
        <h3 style={nameStyle}>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <button onClick={() => onToggleSoldOut(id)}>
          {soldOut ? "Back in Stock" : "Sold Out"}
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}

export default PlantCard;
