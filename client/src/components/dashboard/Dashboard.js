import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import ListDeals from "./deallist/ListDeals";
import ListWorkers from "./workerlist/ListWorkers";
import ListHours from "./hourlist/ListHours";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allDeals, setAllDeals] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);
  const [dealsChange, setDealsChange] = useState(false);
  const [workersChange, setWorkersChange] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);

  const getName = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      setName(parseData[0].name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getDeals = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/deals", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setAllDeals(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getWorkers = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/workers", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      setAllWorkers(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getDeals();
    setDealsChange(false);
  }, [dealsChange])

  useEffect(() => {
    getWorkers();
    setWorkersChange(false);
  }, [workersChange])

  return (
    <div className="card text-center">
      <div className="d-flex pt-4 pb-3 px-3 justify-content-between">
        <h1>Bonjour <span className="text-primary">{name}</span></h1>
        <button onClick={e => logout(e)} className="btn text-primary text-decoration-undeline">
          Se déconnecter
        </button>
      </div>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button onClick={()=>setTabSelected(0)} className={"nav-link " + (tabSelected === 0 ? "active text-primary" : "")}>
                Récapitulatifs
            </button>
          </li>
          <li className="nav-item">
            <button onClick={()=>setTabSelected(1)} className={"nav-link " + (tabSelected === 1 ? "active text-primary" : "")}>
                Ajouter des heures
            </button>
          </li>
          <li className="nav-item">
            <button onClick={()=>setTabSelected(2)} className={"nav-link " + (tabSelected === 2 ? "active text-primary" : "")}>
                Mes affaires
            </button>
          </li>
          <li className="nav-item">
            <button onClick={()=>setTabSelected(3)} className={"nav-link " + (tabSelected === 3 ? "active text-primary" : "")}>
                Mes employés
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body container">
        {
          (tabSelected === 0) && <h1>C'est toujours vide ici</h1>
        }
        {
          (tabSelected === 1) && <ListHours allWorkers={allWorkers} allDeals={allDeals}/>
        }
        {
          (tabSelected === 2) && <ListDeals allDeals={allDeals} setDealsChange={setDealsChange} />
        }
        {
          (tabSelected === 3) && <ListWorkers allWorkers={allWorkers} setWorkersChange={setWorkersChange}/>
        }
      </div>
    </div>
  );
};

export default Dashboard;
