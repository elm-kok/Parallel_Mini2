const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const path = "./users.txt";
users = undefined;
var s = new Set();
router.get("/", (req, res) => {
  fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    users = JSON.parse(data);
    Object.keys(users).forEach(function(key) {
      for (j in users[key]) s.add(users[key][j]);
    });

    res.status(200).send(Array.from(s));
  });
});

module.exports = router;
