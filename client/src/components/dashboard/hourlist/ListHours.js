import React, { Fragment, useState, useEffect } from "react";
import { Calendar } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import InputHour from "./InputHour";

const adapter = new MomentUtils({locale: "fr"});
const ListHours = ({ allWorkers, allDeals }) => {

  const [hours, setHours] = useState([]); //empty array
  const [hoursChanged, setHoursChanged] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [dateSelected, setDateSelected] = useState(adapter.date());
  //delete hour function

  async function getHours() {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/hours/date/${dateSelected}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setHours(parseData)
      setHoursChanged(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getHours();
  },[dateSelected])

  useEffect(()=>{
    console.log(hours);
  },[hoursChanged])

  return (
    <Fragment>
      <div className="d-flex">
        <div className="mr-4">
          <Calendar 
            date={dateSelected}
            onChange={setDateSelected}
          />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-end mb-3">
            <InputHour date={dateSelected} setDate={setDateSelected} allWorkers={allWorkers} allDeals={allDeals}/>
            <button className="btn btn-outline-primary ml-2">Modifier ma liste</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Affaire</th>
                <th>Heures</th>
              </tr>
            </thead>
            <tbody>
              {
                hours.map((hour, i) => {
                  return <tr key={i}>
                    <td>{hour.name}</td>
                    <td>{hour.lastname}</td>
                    <td>{hour.description}</td>
                    <td>{adapter.moment(hour.date_start).format('hh:mm') + "-" + adapter.moment(hour.date_end).format('hh:mm')}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
    
  );
};

export default ListHours;
