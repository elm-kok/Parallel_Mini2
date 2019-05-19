const { Router } = require("express");
const router = new Router();
const fs = require("fs");

var users = {};

router.get("/:ROOM_ID", (req, res) => {
  fs.readFile("./users.txt", { encoding: "utf-8" }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    users = JSON.parse(data);
  });
  if (!users[req.params.ROOM_ID])
    res.status(404).send(`Room does not exist`);
  else res.status(200).json(users[req.params.ROOM_ID]);
});

router.post("/:ROOM_ID", (req, res) => {
  if (
    users[req.params.ROOM_ID] &&
    users[req.params.ROOM_ID].includes(req.body.user)
  ) {
    fs.writeFile("./users.txt", JSON.stringify(users), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    res.status(200).json({});
  } else if (users[req.params.ROOM_ID]) {
    users[req.params.ROOM_ID].push(req.body.user);
    res.status(201).json(`${req.body.ROOM_ID} already exists`);
  }
});

router.delete("/:ROOM_ID", (req, res) => {
  if (users[req.params.ROOM_ID].includes(req.body.user)) {
    for (i in users[req.params.ROOM_ID]) {
      if (users[req.params.ROOM_ID][i] === req.body.user) {
        users[req.params.ROOM_ID].splice(i, 1);
      }
    }
    fs.writeFile("./users.txt", JSON.stringify(users), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    res.status(200).send(`${req.body.user} leaves the room`);
  } else {
    res.status(404).send(`${req.body.user} is not found`);
  }
});
module.exports = router;
