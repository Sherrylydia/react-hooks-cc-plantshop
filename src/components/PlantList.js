import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut, onDelete }) {
  return (
    <ul className="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleSoldOut={onToggleSoldOut}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default PlantList;
