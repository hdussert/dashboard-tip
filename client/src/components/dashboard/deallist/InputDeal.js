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

      const parseResponse = await response.json();

      console.log(parseResponse);

      setDealsChange(true);
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    } 
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Ajouter une affaire</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add deal"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success ">Ajouter</button>
      </form>
    </Fragment>
  );
};

export default InputDeal;
