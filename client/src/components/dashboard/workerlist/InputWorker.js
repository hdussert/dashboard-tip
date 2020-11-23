import React, { Fragment, useState } from "react";

const InputWorker = ({ setWorkersChange }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { name, lastname };
      const response = await fetch("http://localhost:5000/dashboard/workers", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      setWorkersChange(true);
      setName("");
      setLastname("");
    } catch (err) {
      console.error(err.message);
    } 
  };

  const resetNames = () => {
    setName("");
    setLastname("");
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#modal-target-inputworker`}
        onClick={resetNames}
      >
        Ajouter
      </button>
      <div
        className="modal"
        id={`modal-target-inputworker`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Ajouter un employé</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nom"
                  className="form-control mb-1"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={onSubmitForm}
              >
                Ajouter
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                data-dismiss="modal"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputWorker;
