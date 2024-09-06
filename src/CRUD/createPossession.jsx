import React, { useState } from "react";
import "../myCSS.css";
import { Link } from "react-router-dom";
const CreatePossessionForm = () => {
  const [formData, setFormData] = useState({
    possesseur: "John Doe",
    libelle: "",
    valeur: "",
    dateDebut: "",
    taux: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('/possession', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (response.ok) {
        alert("Possession created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to create possession: ${errorData.error}`);
      }
    } catch (error) {
      console.error("There was an error creating the possession!", error);
    }
  };

  return (
    <div className="create-form-container">
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Libelle:
          <input
            type="text"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Valeur:
          <input
            type="number"
            name="valeur"
            value={formData.valeur}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date Début:
          <input
            type="date"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Taux:
          <input
            type="number"
            step="0.01"
            name="taux"
            value={formData.taux}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Create Possession
        </button>
      </form>
      <Link to='/possession'>
      <button type="button" className="btn btn-dark" id="return-update">
         GO BACK
        </button>
        </Link>
      
    </div>
  );
};

export default CreatePossessionForm;
