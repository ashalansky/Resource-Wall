const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  return router;
};



app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const queryString = `
  SELECT * 
  FROM users
  WHERE username = $1`;
  const queryParams = [username];
  db.query(queryString, queryParams)
  .then(data => data.rows)
  .then(user => {
    if (user.length) {
      if (bcrypt.compareSync(password, user[0]["password"])) {
        req.session.userId = user[0]["id"];
        res.redirect("/");
      } else {
        res.render("login");
      }
    } else {
      res.render("login");
    }
  });
});