import React, { useState} from "react";
import {Link} from 'react-router-dom';
const UpdatePossessionForm = () => {
  const [formData, setFormData] = useState({
    possesseur: "",
    libelle: "",
    valeur: "",
    dateDebut: "",
    dateFin: "",
    taux: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/possession/${formData.libelle}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateFin: formData.dateFin,
        }),
      });

      if (response.ok) {
        alert("Update successful!");
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("There was an error updating the possession!", error);
    }
  };

  return (
    <div className="update-page">
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          Libelle:
          <br />
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
          Date Fin:
          <br />
          <input
            type="date"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" className="btn btn-dark">
          UPDATE
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

export default UpdatePossessionForm;