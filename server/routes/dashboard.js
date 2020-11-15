const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all deals and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT name FROM users WHERE id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT users.name, deal.id, deal.description FROM users LEFT JOIN deals AS deal ON users.id = deal.user_id WHERE users.id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a deal

router.post("/deals", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newdeal = await pool.query(
      "INSERT INTO deals (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newdeal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a deal

router.put("/deals/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedeal = await pool.query(
      "UPDATE deals SET description = $1 WHERE id = $2 AND id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updatedeal.rows.length === 0) {
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
    const deletedeal = await pool.query(
      "DELETE FROM deals WHERE id = $1 AND id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deletedeal.rows.length === 0) {
      return res.json("This deal is not yours");
    }

    res.json("deal was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
