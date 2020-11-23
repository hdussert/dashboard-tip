const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

// name

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT users.name FROM users WHERE users.id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//all deals

router.get("/deals", authorize, async (req, res) => {
  try {
    const deals = await pool.query(
      "SELECT d.id, d.description\
      FROM users LEFT JOIN deals AS d\
      ON users.id = d.user_id\
      WHERE users.id = $1 ORDER BY d.id DESC",
      [req.user.id]
    );

    res.json(deals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a deal

router.post("/deals", authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const newDeal = await pool.query(
      "INSERT INTO deals (user_id, description)\
      VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newDeal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a deal

router.put("/deals/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateDeal = await pool.query(
      "UPDATE deals SET description = $1\
      WHERE id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateDeal.rows.length === 0) {
      return res.json("This deal is not yours");
    }

    res.json("deal was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a deal

router.delete("/deals/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDeal = await pool.query(
      "DELETE FROM deals\
      WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteDeal.rows.length === 0) {
      return res.json("This deal is not yours");
    }

    res.json("deal was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//all workers

router.get("/workers", authorize, async (req, res) => {
  try {
    const workers = await pool.query(
      "SELECT w.id, w.name, w.lastname\
      FROM users LEFT JOIN workers AS w\
      ON users.id = w.manager_id WHERE users.id = $1",
      [req.user.id]
    );

    res.json(workers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a worker

router.post("/workers", authorize, async (req, res) => {
  try {
    const { name, lastname } = req.body;

    const newWorker = await pool.query(
      "INSERT INTO workers (manager_id, name, lastname)\
      VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, name, lastname]
    );

    res.json(newWorker.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a worker

router.delete("/workers/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWorker = await pool.query(
      "DELETE FROM workers\
      WHERE id = $1 AND manager_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteWorker.rows.length === 0) {
      return res.json("This worker is not yours");
    }

    res.json("Worker was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//all hours

router.get("/hours/worker/:id", authorize, async (req, res) => {
  try {
    const hours = await pool.query(
      "SELECT *\
      FROM work LEFT JOIN workers\
      ON work.worker_id = workers.id\
      WHERE workers.id = 1$",
      [req.params.id]
    );

    res.json(hours.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/hours/date/:date", authorize, async (req, res) => {
  try {
    console.log(req.params.date);
    const hours = await pool.query(
      "SELECT *\
      FROM work LEFT JOIN workers\
      ON work.worker_id = workers.id\
      LEFT JOIN deals\
      ON work.deal_id = deals.id\
      WHERE date_trunc('day', $1::timestamp) = date_trunc('day', work.date_start::timestamp)",
      [req.params.date]
    );

    res.json(hours.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create hours

router.post("/hours", authorize, async (req, res) => {
  try {
    const { dateStart, dateEnd, dealSelected, workersSelected } = req.body;

    workersSelected.map(async worker_id => {
      const newHours = await pool.query(
        "INSERT INTO work (worker_id, deal_id, date_start, date_end)\
        VALUES ($1, $2, $3, $4) RETURNING *",
        [worker_id, dealSelected, dateStart, dateEnd]);
    })
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
