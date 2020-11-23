import React, { Fragment, useState } from "react";

const EditDeal = ({ deal, setDealsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/deals/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setDealsChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [description, setDescription] = useState(deal.description);
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-toggle="modal"
        data-target={`#id${deal.id}`}
        onClick={() => setDescription(deal.description)}
      >
        Modifier
      </button>
      <div
        className="modal"
        id={`id${deal.id}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modifier</h4>
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
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-dismiss="modal"
                onClick={() => editText(deal.id)}
              >
                Modifier
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditDeal;
