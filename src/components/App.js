import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://plantsy-api-fq97.onrender.com/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleToggleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);

    fetch(`https://plantsy-api-fq97.onrender.com/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soldOut: !plants.find(p => p.id === id).soldOut })
    });
  }

  function handleDelete(id) {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);

    fetch(`https://plantsy-api-fq97.onrender.com/plants/${id}`, {
      method: "DELETE"
    });
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Plantsy 🌿</h1>
      </header>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList
        plants={filteredPlants}
        onToggleSoldOut={handleToggleSoldOut}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
