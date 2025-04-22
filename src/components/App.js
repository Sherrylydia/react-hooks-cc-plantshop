import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import PlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://plantsy-api-fq97.onrender.com/plants")
      .then((res) => res.json())
      .then(setPlants)
      .catch((err) => console.error("Failed to load plants:", err));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  function handleToggleSoldOut(id) {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, soldOut: !p.soldOut } : p
      )
    );
  }

  function handleUpdatePrice(id, newPrice) {
    fetch(`https://plantsy-api-fq97.onrender.com/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        setPlants((prev) =>
          prev.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  }

  function handleDelete(id) {
    fetch(`https://plantsy-api-fq97.onrender.com/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants((prev) => prev.filter((plant) => plant.id !== id));
    });
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🌿 Plantsy Admin</h1>
      <PlantForm onAddPlant={handleAddPlant} />
      <Search value={searchTerm} onChange={setSearchTerm} />
      <PlantList
        plants={displayedPlants}
        onToggleSoldOut={handleToggleSoldOut}
        onUpdatePrice={handleUpdatePrice}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
