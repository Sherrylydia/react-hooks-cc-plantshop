import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onPriceUpdate, onDeletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onPriceUpdate={onPriceUpdate}
          onDelete={onDeletePlant}
        />
      ))}
    </ul>
  );
}

export default PlantList;
