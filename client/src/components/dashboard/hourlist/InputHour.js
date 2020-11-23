import React, { Fragment, useState, useEffect } from "react";

import { TimePicker, DatePicker } from '@material-ui/pickers';

const InputHour = ({ setHoursChange, allWorkers, allDeals, date, setDate }) => {

  const [dealSelected, setDealSelected] = useState();
  const [workersSelected, setWorkersSelected] = useState([]);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { dateStart, dateEnd, dealSelected, workersSelected };
      console.log(body);
      const response = await fetch("http://localhost:5000/dashboard/hours", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      // const parseResponse = await response.json();
      setHoursChange(true);
    } catch (err) {
      console.error(err.message);
    } 
  };

  const handleCheck = (worker_id) => {
    if (workersSelected.indexOf(worker_id) < 0) {
      setWorkersSelected(workersSelected => [...workersSelected, worker_id]);
    }
    else
      setWorkersSelected(workersSelected.filter(id => id != worker_id));
  }

  useEffect(()=>{
    console.log(workersSelected)
  },[workersSelected])
  // Update the day 
  useEffect(()=>{
    setDateStart(new Date(date)); // keep hours, minutes
    setDateEnd(new Date(date)); // same
    // Fetch Worked Hours
  }, [date]);

  return (
    <Fragment>


      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#modal-target-inputworker`}
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
              <h4 className="modal-title">Ajouter des heures</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body px-5">
              <div className="mb-4">
                <DatePicker 
                  autoOk
                  label="LE"
                  fullWidth
                  value={date}
                  onChange={setDate}
                />

                <div className="d-flex justify-content-around mt-3">
                  <TimePicker 
                    autoOk 
                    label="DE" 
                    value={dateStart} 
                    onChange={setDateStart}
                    minutesStep={5} 
                    />

                  <TimePicker 
                    autoOk 
                    label="À" 
                    value={dateEnd} 
                    onChange={setDateEnd} 
                    minutesStep={5} 
                  />
                </div>
              </div>

              <div className="mb-4">
                <h6 className="card-subtitle text-left text-muted mb-1">Affaire</h6>
                <select className="custom-select" onChange={e => setDealSelected(e.target.value)}>
                  <option value={null}>Choisir une affaire...</option>
                  {
                    allDeals.map((deal, i) => {
                      return <option key={i} value={deal.id}>{'['+ deal.id + '] - ' + deal.description}</option>
                    })
                  }
                </select>
              </div>

              <div className="text-left"> 
                <h6 className="card-subtitle text-muted mb-1">Employés</h6>
                  {
                    allWorkers.map((worker, i) => {
                      return <div className="custom-control custom-checkbox" key={i}>
                        <input type="checkbox" className="custom-control-input" id={"workerCheck" + i} onChange={()=>handleCheck(worker.id)}/>
                        <label className="custom-control-label" htmlFor={"workerCheck" + i}>{worker.name + ' ' + worker.lastname}</label>
                      </div> 
                    })
                  }
              </div>
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

export default InputHour;
