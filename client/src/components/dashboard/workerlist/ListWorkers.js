import React, { Fragment, useState, useEffect } from "react";
import InputWorker from './InputWorker';

const ListWorkers = ({ allWorkers, setWorkersChange }) => {

  const [workers, setWorkers] = useState([]); //empty array
  const [edit, setEdit] = useState(false);
  //delete worker function

  async function deleteWorker(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/workers/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setWorkers(workers.filter(worker => worker.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setWorkers(allWorkers);
  }, [allWorkers]);

  return (
    <Fragment>
      <div className="d-flex justify-content-end mb-3">
        <InputWorker setWorkersChange={setWorkersChange}/>
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
            <th>Prénom</th>
            <th>Nom</th>
            {edit && <th>Supprimer</th>}
          </tr>
        </thead>
        <tbody>
          {workers.length !== 0 &&
            workers[0].id !== null &&
            workers.map(worker => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.lastname}</td>
                {edit && <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteWorker(worker.id)}
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

export default ListWorkers;
