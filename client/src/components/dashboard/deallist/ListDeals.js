import React, { Fragment, useState, useEffect } from "react";
import EditDeal from "./EditDeal";
import InputDeal from "./InputDeal";

const ListDeals = ({ allDeals, setDealsChange }) => {
  const [deals, setDeals] = useState([]); //empty array
  const [edit, setEdit] = useState(false);

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

  useEffect(() => {
    setDeals(allDeals);
  }, [allDeals]);

  return (
    <Fragment>
      <div className="d-flex justify-content-end mb-3">
        <InputDeal setDealsChange={setDealsChange}/>
        <button 
          className="btn btn-outline-primary ml-2" 
          onClick={()=>setEdit(!edit)}
        >
          {edit ? "Ok" : "Modifier ma liste"}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Description</th>
            {edit && <th>Modifier</th> }
            {edit && <th>Supprimer</th>}
          </tr>
        </thead>
        <tbody>
          {deals.length !== 0 &&
            deals[0].id !== null &&
            deals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.id}</td>
                <td>{deal.description}</td>
                {edit && <td>
                  <EditDeal deal={deal} setDealsChange={setDealsChange} />
                </td>}
                {edit && <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDeal(deal.id)}
                  >
                    Supprimer
                  </button>
                </td>}
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListDeals;
