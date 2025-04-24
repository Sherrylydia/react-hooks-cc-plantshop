import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPlant = {
      ...formData,
      price: parseFloat(formData.price),
      soldOut: false
    };

    fetch("https://plantsy-api-fq97.onrender.com/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant)
    })
      .then((r) => r.json())
      .then(onAddPlant);

    setFormData({ name: "", image: "", price: "" });
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
