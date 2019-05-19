const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const path = "./users.txt";
router.get("/:ROOM_ID", (req, res) => {
  fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    const users = JSON.parse(data);
    if (users[req.params.ROOM_ID] === undefined)
      res.status(404).json(`Room does not exist`);
    else res.status(200).json(users[req.params.ROOM_ID]);
  });
});

router.post("/:ROOM_ID", (req, res) => {
  var users = JSON.parse(fs.readFileSync("./users.txt", { encoding: "utf-8" }));
  if (users[req.params.ROOM_ID] === undefined) users[req.params.ROOM_ID] = [];
  if (!users[req.params.ROOM_ID].includes(req.body.user)) {
    users[req.params.ROOM_ID].push(req.body.user);
    fs.writeFileSync(path, JSON.stringify(users));
    res.status(201).json({});
  } else {
    users[req.params.ROOM_ID].push(req.body.user);
    res.status(200).json(`${req.params.ROOM_ID} already exists`);
  }
});

router.delete("/:ROOM_ID", (req, res) => {
  fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    const users = JSON.parse(data);
    if (
      users[req.params.ROOM_ID] !== undefined &&
      users[req.params.ROOM_ID].includes(req.body.user)
    ) {
      for (i in users[req.params.ROOM_ID]) {
        if (users[req.params.ROOM_ID][i] === req.body.user) {
          users[req.params.ROOM_ID].splice(i, 1);
        }
      }
      fs.writeFileSync(path, JSON.stringify(users), function(err) {
        if (err) {
          return console.log(err);
        }
      });
      res.status(200).json(`${req.body.user} leaves the room`);
    } else {
      res.status(404).json(`${req.body.user} is not found`);
    }
  });
});
module.exports = router;
