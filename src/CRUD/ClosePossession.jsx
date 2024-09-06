import React, { useState } from "react";

const ClosePossessionForm = () => {
  const [formData, setFormData] = useState({
    libelle: ""
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    try {
      const response = await fetch(`/possession/${formData.libelle}/close`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <form onSubmit={handleSubmit}>
      <label>
        Libelle:
        <input type="text" name="libelle" value={formData.libelle} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Accept</button>
    </form>
  );
};

export default ClosePossessionForm;
