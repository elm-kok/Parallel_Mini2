const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const path = "./users.txt";
var all_rooms = {};

router.get("/", (req, res) => {
  var s = new Set();
  fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    all_rooms = JSON.parse(data);
    Object.keys(all_rooms).forEach(function(key) {
      s.add(key);
    });
    res.status(200).send(Array.from(s));
  });
});

router.post("/", (req, res) => {
  if (!all_rooms[req.body.id]) {
    all_rooms[req.body.id] = [];
    fs.writeFileSync(path, JSON.stringify(all_rooms), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    res.status(201).json({ id: req.body.id });
  } else {
    res.status(404).json(`${req.body.id} already exists`);
  }
});

router.put("/", (req, res) => {
  if (!all_rooms[req.body.id]) {
    all_rooms[req.body.id] = [];
    fs.writeFileSync(path, JSON.stringify(all_rooms), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    res.status(201).json({ id: req.body.id });
  } else {
    res.status(200).json({ id: req.body.id });
  }
});

router.delete("/", (req, res) => {
  if (all_rooms[req.body.id]) {
    var tmp = {};
    Object.keys(all_rooms).forEach(function(key) {
      if (key !== req.body.id) tmp[key] = all_rooms[key];
    });
    all_rooms = tmp;
    fs.writeFileSync(path, JSON.stringify(tmp), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    res.status(200).json(`${req.body.id} is deleted`);
  } else {
    res.status(404).json(`${req.body.id} is not found`);
  }
});

module.exports = router;
