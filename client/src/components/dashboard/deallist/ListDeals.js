import React, { Fragment, useState, useEffect } from "react";
import EditDeal from "./EditDeal";

const ListDeals = ({ allDeals, setDealsChange }) => {
  console.log(allDeals);
  const [deals, setDeals] = useState([]); //empty array

  //delete deal function

  async function deleteDeal(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/deals/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setDeals(deals.filter(deal => deal.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // async function getDeals() {
  //   const res = await fetch("http://localhost:5000/deals");

  //   const dealArray = await res.json();

  //   setDeals(dealArray);
  // }

  useEffect(() => {
    setDeals(allDeals);
  }, [allDeals]);

  console.log(deals);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {deals.length !== 0 &&
            deals[0].id !== null &&
            deals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.id}</td>
                <td>{deal.description}</td>
                <td>
                  <EditDeal deal={deal} setDealsChange={setDealsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDeal(deal.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListDeals;
