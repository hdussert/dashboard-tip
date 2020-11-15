import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import InputDeal from "./deallist/InputDeal";
import ListDeals from "./deallist/ListDeals";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allDeals, setAllDeals] = useState([]);
  const [dealsChange, setDealsChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllDeals(parseData);

      setName(parseData[0].name);
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
    getProfile();
    setDealsChange(false);
  }, [dealsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Deal List</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputDeal setDealsChange={setDealsChange} />
      <ListDeals allDeals={allDeals} setDealsChange={setDealsChange} />
    </div>
  );
};

export default Dashboard;
