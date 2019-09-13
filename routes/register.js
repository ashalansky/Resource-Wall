const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const usernameQueryString = `
    SELECT *
    FROM users
    WHERE username = $1`;

    const usernameQueryParams = [username];

    db.query(usernameQueryString, usernameQueryParams)
    .then(data => data.rows)
    .then(usernameCheck => {
    if(!usernameCheck.length) {
      const regQueryString = `
      INSERT INTO users(username, password)
      VALUES($1, $2) RETURNING *`

      const regQueryParams = [username, hashedPassword];

      db.query(regQueryString, regQueryParams)
      .then(data => data.rows)
      .then(user => {
        console.log(user);
        req.session.userId = user[0]["id"];
        res.redirect("/");
      })
    } else {
        const templateVars = {
          data: user,
          error: true
      }
        res.render('registration', templateVars);
      }

    });

  })
  return router;
};




