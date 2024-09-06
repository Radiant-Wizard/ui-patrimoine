import { useState, useEffect } from "react";
import Possession from "../Possession";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../myCSS.css";
import "bootstrap/dist/css/bootstrap.min.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Patrimoine = () => {
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
  }, []);

  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [jour, setJour] = useState(1);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Valeur du Patrimoine",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleGetValeur = async () => {
    try {
      const response = await fetch("https://patrimoine-economique-naxg.onrender.com/patrimoine/range", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateDebut, dateFin, jour }),
      });
      const result = await response.json();
      console.log("Données reçues:", result);

      const value = Object.values(result.result);
      const label = Object.keys(result.result);

      const chartData = {
        labels: label,
        datasets: [
          {
            label: "Valeur du Patrimoine",
            data: value,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      };
      setData(chartData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const calculateCurrentValue = () => {
    const selectedDateObj = new Date(selectedDate);
    if (isNaN(selectedDateObj.getTime())) {
      alert("Please select a valid date");
      return;
    }
    const totalValue = possessions.reduce(
      (acc, possession) => acc + possession.getValeur(selectedDateObj),
      0
    );
    setPatrimoineValue(totalValue);
  };

  return (
    <div
      className="chart bg-dark text-light p-4"
      style={{ minHeight: "100vh", minWidth: "100dvw" }}
      id="chart-page"
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="me-auto">
            Patrimoine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="ms-auto"
            >
              <NavDropdown.Item as={Link} to="/">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/possession">
                Possession
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h2 className="text-center mb-4">Graphique du Patrimoine</h2>
      <Container
        fluid
        style={{
          gap: "2vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "1.5vw",
          }}
        >
          <label htmlFor="dateDebut" style={{ marginBottom: "0.5rem" }}>
            Date Début
          </label>
          <DatePicker
            selected={dateDebut}
            onChange={(date) => setDateDebut(date)}
            className="form-control bg-dark text-light"
            id="dateDebut"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "1.5vw",
          }}
        >
          <label htmlFor="dateFin" style={{ marginBottom: "0.5rem" }}>
            Date Fin
          </label>
          <DatePicker
            selected={dateFin}
            onChange={(date) => setDateFin(date)}
            className="form-control bg-dark text-light"
            id="dateFin"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "1.5vw",
          }}
        >
          <label htmlFor="jour" style={{ marginBottom: "0.5rem" }}>
            Jour
          </label>
          <select
            value={jour}
            onChange={(e) => setJour(e.target.value)}
            className="form-select bg-dark text-light"
            id="jour"
          >
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGetValeur}
          className="btn btn-primary"
          style={{ marginTop: "3vh", height: "4vh" }}
        >
          Valider
        </button>
      </Container>

      <div className="bg-dark p-3 rounded">
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "white",
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white",
                },
              },
              y: {
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="footer my-4">
        <h2>Calcul du Patrimoine</h2>
        <div className="mb-3">
          <label htmlFor="datePicker" className="form-label">
            Select Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <Button
          onClick={calculateCurrentValue}
          variant="primary"
          className="mb-3"
        >
          Valider
        </Button>
        <h4>
          Valeur du Patrimoine: <span>{patrimoineValue.toFixed(2)} Ar</span>
        </h4>
      </div>
    </div>
  );
};

export default Patrimoine;
