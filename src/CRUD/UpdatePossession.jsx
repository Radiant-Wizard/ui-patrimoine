import React, { useState } from "react";
import { Link } from "react-router-dom";

const UpdatePossessionForm = () => {
  const [formData, setFormData] = useState({
    currentLibelle: "",
    newLibelle: "",
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
      const response = await fetch(`/possession/${formData.currentLibelle}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libelle: formData.newLibelle,
        }),
      });

      if (response.ok) {
        alert("Possession renamed successfully!");
      } else {
        const errorData = await response.json();
        alert(`Rename failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error renaming the possession!", error);
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
            name="currentLibelle"
            value={formData.currentLibelle}
            onChange={handleChange}
            placeholder="Enter current libelle"
            required
          />
        </label>
        <br />
        <label>
          New Libelle:
          <br />
          <input
            type="text"
            name="newLibelle"
            value={formData.newLibelle}
            onChange={handleChange}
            placeholder="Enter new libelle"
            required
          />
        </label>
        <br />
        <button type="submit" className="btn-dark">
          UPDATE
        </button>
      </form>
      <Link to='/possession'>
        <button type="button" className="btn-dark" id="return-update">
          GO BACK
        </button>
      </Link>
    </div>
  );
};

export default UpdatePossessionForm;