import React, { Fragment, useState } from "react";

const InputDeal = ({ setDealsChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      const response = await fetch("http://localhost:5000/dashboard/deals", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });
      setDealsChange(true);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    } 
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#modal-target-inputdeal`}
        onClick={()=>setDescription("")}
      >
        Ajouter
      </button>
      <div
        className="modal"
        id={`modal-target-inputdeal`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Ajouter une affaire</h4>
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
                placeholder="Nom de l'affaire"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
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

export default InputDeal;
