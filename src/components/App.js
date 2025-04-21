import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then(setPlants)
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Add a new plant to state
  const addNewPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  // Update plant price
  const updatePlantPrice = (updatedPlant) => {
    const updatedList = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedList);
  };

  // Delete plant from state
  const deletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  // Filter based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🌿 Plantsy Admin</h1>
      <NewPlantForm onAddPlant={addNewPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        onPriceUpdate={updatePlantPrice}
        onDeletePlant={deletePlant}
      />
    </div>
  );
}

export default App;
