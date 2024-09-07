import React, { useState, useEffect} from "react";
import Possession from "../Possession";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../myCSS.css";
import { Link } from "react-router-dom";
import { Navbar, Table } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";


const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    fetch("https://patrimoine-economique-naxg.onrender.com/possession")
      .then((response) => response.json())
      .then((data) => {
        const possessionsData =
          data
            .find((item) => item.model === "Patrimoine")
            ?.data?.possessions.map(
              (item) =>
                new Possession(
                  item.possesseur.nom,
                  item.libelle,
                  item.valeur,
                  new Date(item.dateDebut),
                  item.dateFin ? new Date(item.dateFin) : null,
                  item.tauxAmortissement,
                  item.jour,
                  item.valeurConstante
                )
            ) || [];
        console.log(data);

        setPossessions(possessionsData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  const handleClose = async (libelle) => {
    try {
      const response = await fetch(`/possession/${libelle}/close`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Possession closed successfully");
        const updatedResponse = await fetch("https://patrimoine-economique-naxg.onrender.com/possession");
        const updatedData = await updatedResponse.json();
        setPossessions(
          updatedData
            .find((item) => item.model === "Patrimoine")
            ?.data?.possessions.map(
              (item) =>
                new Possession(
                  item.possesseur.nom,
                  item.libelle,
                  item.valeur,
                  new Date(item.dateDebut),
                  item.dateFin ? new Date(item.dateFin) : null,
                  item.tauxAmortissement,
                  item.jour,
                  item.valeurConstante
                )
            ) || []
        );
      } else {
        const errorData = await response.json();
        alert(`Failed to close possession: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error closing possession:", error);
      alert("There was an error closing the possession.");
    }
  };



  return (
    <div className="container-fluid" id="container-possessionTable">
      <Navbar id="Navbar" bg="dark" variant="dark" expand="lg">
        <div className="d-flex align-items-center">
          <Navbar.Brand href="/" className="mx-3">
            Patrimoine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              style={{ color: "white", fontSize: "1.2rem" }}
            >
              <NavDropdown.Item as={Link} to="/">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/patrimoine">
                Patrimoine
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <h1 className="text-center my-4">Patrimoine de John Doe</h1>

      <Table bordered hover responsive variant="dark" className="table-dark">
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Amortissement (%)</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.dateDebut.toDateString()}</td>
              <td>
                {possession.dateFin ? possession.dateFin.toDateString() : "N/A"}
              </td>
              <td>{possession.tauxAmortissement || "N/A"}</td>
              <td>{possession.getValeur(new Date()).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleClose(possession.libelle)}
                >
                  Close
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center my-4">
        <Link to="/create-possession" className="mx-2">
          <Button variant="success" size="lg">
            New
          </Button>
        </Link>
        <Link to="/" className="mx-2">
          <Button variant="info" size="lg">
            Home
          </Button>
        </Link>
        <Link to="/update-possession" className="mx-2">
          <Button variant="warning" size="lg">
            Update
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PossessionTable;
